import { Types } from "mongoose";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/order.model").Order, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/order.model").Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    cancelOrder(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/order.model").Order, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/order.model").Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateOrderAddress(id: string, address: string): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/order.model").Order, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/order.model").Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    createCheckoutSession(orderId: Types.ObjectId, req: any): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Checkout.Session>>;
    refundOrder(orderId: Types.ObjectId, req: any): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/order.model").Order, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/order.model").Order & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
