import { Model, Types } from "mongoose";
import { Cart } from "src/DB/models/cart.model";
import { Order } from "src/DB/models/order.model";
import { PaymentService } from "src/common/services/payment/payment.service";
import Stripe from "stripe";
import { CreateOrderDto } from "./dto/create-order.dto";
export declare class OrderService {
    private orderModel;
    private cartModel;
    private paymentService;
    private readonly request;
    private stripe;
    constructor(orderModel: Model<Order>, cartModel: Model<Cart>, paymentService: PaymentService, request: any);
    create(createOrderDto: CreateOrderDto): Promise<import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    cancelOrder(id: string): Promise<import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateOrderAddress(id: string, address: string): Promise<import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    createCheckoutSession(orderId: Types.ObjectId, userId: Types.ObjectId): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    refundOrder(orderId: Types.ObjectId, userId: Types.ObjectId): Promise<import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
