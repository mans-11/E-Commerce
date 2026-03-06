import { Model } from "mongoose";
import { Cart } from "src/DB/models/cart.model";
import { Order } from "src/DB/models/order.model";
import { CreateOrderDto } from "./dto/create-order.dto";
export declare class OrderService {
    private orderModel;
    private cartModel;
    private readonly request;
    constructor(orderModel: Model<Order>, cartModel: Model<Cart>, request: any);
    create(createOrderDto: CreateOrderDto): Promise<import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    cancelOrder(id: string): Promise<import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    updateOrderAddress(id: string, address: string): Promise<import("mongoose").Document<unknown, {}, Order, {}, import("mongoose").DefaultSchemaOptions> & Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
