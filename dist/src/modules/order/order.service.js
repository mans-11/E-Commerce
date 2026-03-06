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
let OrderService = class OrderService {
    orderModel;
    cartModel;
    request;
    constructor(orderModel, cartModel, request) {
        this.orderModel = orderModel;
        this.cartModel = cartModel;
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
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_model_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(cart_model_1.Cart.name)),
    __param(2, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model, Object])
], OrderService);
//# sourceMappingURL=order.service.js.map