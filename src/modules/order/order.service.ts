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
} from "lib/order/create-order.interface";
import { TAX } from "lib/order/order-interface";
import { Model } from "mongoose";
import { Cart } from "src/DB/models/cart.model";
import { Order } from "src/DB/models/order.model";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
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
}
