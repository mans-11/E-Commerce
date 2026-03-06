import { Types } from "mongoose";
import { ICreateOrder, OrderStatus } from "./create-order.interface";

export interface IOrder extends ICreateOrder {
  subTotal: number;
  totalPrice: number;
  user: Types.ObjectId;
  orderStatus: OrderStatus;
}

export const TAX = 0.14;
