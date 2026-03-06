import { ICreateOrder, ICreateOrderItems, OrderStatus, PaymentMethod } from "lib/order/create-order.interface";
import { Types } from "mongoose";
export declare class CreateOrderDto implements ICreateOrder {
    cart: Types.ObjectId;
    orderStatus: OrderStatus;
    address: string;
    paymentMethod: PaymentMethod;
    subtotal: number;
    totalPrice: number;
}
export declare class CreateOrderItemsDto implements ICreateOrderItems {
    product: Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
}
