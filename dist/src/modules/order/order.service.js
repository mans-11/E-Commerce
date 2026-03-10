"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const create_order_interface_1 = require("../../../lib/order/create-order.interface");
const order_interface_1 = require("../../../lib/order/order-interface");
const mongoose_2 = require("mongoose");
const cart_model_1 = require("../../DB/models/cart.model");
const order_model_1 = require("../../DB/models/order.model");
const payment_service_1 = require("../../common/services/payment/payment.service");
let OrderService = class OrderService {
    orderModel;
    cartModel;
    paymentService;
    request;
    stripe;
    constructor(orderModel, cartModel, paymentService, request) {
        this.orderModel = orderModel;
        this.cartModel = cartModel;
        this.paymentService = paymentService;
        this.request = request;
    }
    async create(createOrderDto) {
        const cart = await this.cartModel
            .findById(createOrderDto.cart)
            .populate("items.product");
        if (!cart || !cart.directModifiedPaths.length)
            throw new common_1.NotFoundException("Cart Not Found Or Empty ");
        const items = cart.items.map((item) => {
            return {
                name: item.product.name,
                product: item.product,
                quantity: item.quantity,
                price: item.product.price,
            };
        });
        const userId = this.request.user._id;
        const subTotal = cart.totalPrice;
        const totalPrice = subTotal + subTotal * order_interface_1.TAX;
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
    async cancelOrder(id) {
        const order = await this.orderModel.findById(id);
        if (!order)
            throw new common_1.NotFoundException("Order Not Found");
        if (order.orderStatus === create_order_interface_1.OrderStatus.CANCELLED ||
            order.orderStatus === create_order_interface_1.OrderStatus.DELIVERED ||
            order.orderStatus === create_order_interface_1.OrderStatus.SHIPPED)
            throw new common_1.BadRequestException("Order Already Cancelled Or Delivered Or Shipped");
        order.orderStatus = create_order_interface_1.OrderStatus.CANCELLED;
        await order.save();
        return order;
    }
    async updateOrderAddress(id, address) {
        const order = await this.orderModel.findById(id);
        if (!order)
            throw new common_1.NotFoundException("Order Not Found");
        order.address = address;
        await order.save();
        return order;
    }
    async createCheckoutSession(orderId, userId) {
        const order = await this.orderModel
            .findOne({
            _id: orderId,
            user: userId,
            orderStatus: create_order_interface_1.OrderStatus.PENDING,
            paymentMethod: "card",
        })
            .populate([{ path: "user" }, { path: "cart" }, { path: "coupon" }]);
        if (!order)
            throw new common_1.NotFoundException("Order Not Found");
        const amount = order.totalPrice ?? order.subTotal ?? 0;
        const line_items = [
            {
                currency: "egp",
                product_data: {
                    name: `Order ${order.user.firstName}`,
                    address: `Payment for order with id ${order.address}`,
                },
                unit_amount: amount * 100,
                quantity: 1,
            },
        ];
        const discounts = [];
        if (order.discount) {
            const coupon = await this.paymentService.createCoupon({
                duration: "once",
                currency: "egp",
                amount_off: order.discount * 100,
            });
            discounts.push({ coupon: coupon.id });
        }
        const session = await this.paymentService.checkoutSession({
            customer_email: order.user.email,
            line_items,
            mode: "payment",
            discounts,
            metadata: { orderId: orderId.toString() },
        });
        const method = await this.paymentService.createPaymentMethod({
            type: "card",
            card: { token: process.env.METHOD_TOKEN },
        });
        if (!method)
            throw new common_1.BadRequestException("Payment Method Creation Failed");
        const intent = await this.paymentService.createPaymentIntent({
            amount: order.subTotal * 100,
            currency: "egp",
            payment_method_types: [create_order_interface_1.PaymentMethod.CREDIT_CARD],
        });
        order.intentId = intent.id;
        await order.save();
        await this.paymentService.confirmPaymentIntent(intent.id);
        return session;
    }
    async refundOrder(orderId, userId) {
        const order = await this.orderModel.findOne({
            _id: orderId,
            user: userId,
            paymentMethod: "card",
        });
        if (!order)
            throw new common_1.NotFoundException("Order Not Found");
        if (!order.intentId)
            throw new common_1.BadRequestException("No payment intent found for this order");
        const refund = await this.paymentService.createRefund(order.intentId);
        await this.orderModel.findByIdAndUpdate(orderId, {
            orderStatus: create_order_interface_1.OrderStatus.CANCELLED,
            refundId: refund.id,
            refundAt: new Date(),
            $unset: { intentId: true },
            $inc: { __v: 1 },
        }, { new: true });
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_model_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(cart_model_1.Cart.name)),
    __param(3, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        payment_service_1.PaymentService, Object])
], OrderService);
//# sourceMappingURL=order.service.js.map