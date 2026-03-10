import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import {
  ICreateOrderItems,
  OrderStatus,
  PaymentMethod,
} from "lib/order/create-order.interface";
import { TAX } from "lib/order/order-interface";
import { Model, Types } from "mongoose";
import { Cart } from "src/DB/models/cart.model";
import { Order } from "src/DB/models/order.model";
import type { HUserDocument } from "src/DB/models/user.model";
import { PaymentService } from "src/common/services/payment/payment.service";
import Stripe from "stripe";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  private stripe: Stripe;
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private paymentService: PaymentService,
    @Inject(REQUEST) private readonly request,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const cart = await this.cartModel
      .findById(createOrderDto.cart)
      .populate("items.product");

    if (!cart || !cart.directModifiedPaths.length)
      throw new NotFoundException("Cart Not Found Or Empty ");

    const items: ICreateOrderItems[] = cart.items.map((item) => {
      return {
        name: item.product.name,
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    const userId = this.request.user._id;

    const subTotal = cart.totalPrice;

    const totalPrice = subTotal + subTotal * TAX;

    const order = await this.orderModel.create({
      address: createOrderDto.address,
      paymentMethod: createOrderDto.paymentMethod,
      items,
      cart: cart._id,
      user: userId,
      subTotal: subTotal,
      totalPrice,
    });

    return order;
  }

  async cancelOrder(id: string) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException("Order Not Found");

    if (
      order.orderStatus === OrderStatus.CANCELLED ||
      order.orderStatus === OrderStatus.DELIVERED ||
      order.orderStatus === OrderStatus.SHIPPED
    )
      throw new BadRequestException(
        "Order Already Cancelled Or Delivered Or Shipped",
      );

    order.orderStatus = OrderStatus.CANCELLED;
    await order.save();
    return order;
  }

  async updateOrderAddress(id: string, address: string) {
    const order = await this.orderModel.findById(id);
    if (!order) throw new NotFoundException("Order Not Found");

    order.address = address;
    await order.save();
    return order;
  }

  async createCheckoutSession(orderId: Types.ObjectId, userId: Types.ObjectId) {
    const order = await this.orderModel
      .findOne({
        _id: orderId,
        user: userId,
        orderStatus: OrderStatus.PENDING,
        paymentMethod: "card",
      })
      .populate([{ path: "user" }, { path: "cart" }, { path: "coupon" }]);
    if (!order) throw new NotFoundException("Order Not Found");

    const amount = order.totalPrice ?? order.subTotal ?? 0;
    const line_items = [
      {
        currency: "egp",
        product_data: {
          name: `Order ${(order.user as unknown as HUserDocument).firstName}`,
          address: `Payment for order with id ${order.address}`,
        },
        unit_amount: amount * 100,
        quantity: 1,
      },
    ];

    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (order.discount) {
      const coupon = await this.paymentService.createCoupon({
        duration: "once",
        currency: "egp",
        amount_off: order.discount * 100,
      });
      discounts.push({ coupon: coupon.id });
    }

    const session = await this.paymentService.checkoutSession({
      customer_email: (order.user as unknown as HUserDocument).email,
      line_items,
      mode: "payment",
      discounts,
      metadata: { orderId: orderId.toString() },
    });

    const method = await this.paymentService.createPaymentMethod({
      type: "card",
      card: { token: process.env.METHOD_TOKEN as string },
    });

    if (!method)
      throw new BadRequestException("Payment Method Creation Failed");

    const intent = await this.paymentService.createPaymentIntent({
      amount: order.subTotal * 100,
      currency: "egp",
      payment_method_types: [PaymentMethod.CREDIT_CARD],
    });

    order.intentId = intent.id;
    await order.save();
    await this.paymentService.confirmPaymentIntent(intent.id);

    return session;
  }

  async refundOrder(orderId: Types.ObjectId, userId: Types.ObjectId) {
    const order = await this.orderModel.findOne({
      _id: orderId,
      user: userId,
      paymentMethod: "card",
    });

    if (!order) throw new NotFoundException("Order Not Found");

    if (!order.intentId)
      throw new BadRequestException("No payment intent found for this order");

    const refund = await this.paymentService.createRefund(order.intentId);

    await this.orderModel.findByIdAndUpdate(
      orderId,
      {
        orderStatus: OrderStatus.CANCELLED,
        refundId: refund.id,
        refundAt: new Date(),
        $unset: { intentId: true },
        $inc: { __v: 1 },
      },
      { new: true },
    );

    return order;
  }
}
