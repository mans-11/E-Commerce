import { Types } from "mongoose";

export interface ICreateOrder {
  cart: Types.ObjectId;
  address: string;
  paymentMethod: PaymentMethod;
}

export interface ICreateOrderItems {
  name: string;
  quantity: number;
  price: number;
}

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  PAID = "paid",
  REFUNDED = "refunded",
}

export enum PaymentMethod {
  COD = "cash_on_delivery",
  CREDIT_CARD = "credit_card",
}
