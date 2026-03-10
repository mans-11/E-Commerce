import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  ICreateOrderItems,
  OrderStatus,
  PaymentMethod,
} from "lib/order/create-order.interface";
import { IOrder } from "lib/order/order-interface";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Cart } from "./cart.model";
import { Coupon } from "./coupon.model";

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Order implements IOrder {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    minlength: 3,
    uppercase: true,
  })
  user: Types.ObjectId;

  @Prop([
    {
      type: Number,
      required: true,
    },
  ])
  items: ICreateOrderItems[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Cart.name,
  })
  cart: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Coupon.name,
  })
  coupon?: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    enum: {
      values: Object.values(OrderStatus),
      message: "Invalid Order Status",
    },
  })
  orderStatus: OrderStatus;

  @Prop({
    type: String,
    required: true,
  })
  address: string;

  @Prop({
    type: String,
    required: true,
  })
  phone: string;

  @Prop({
    type: String,
    required: true,
    enum: {
      values: Object.values(PaymentMethod),
      message: "Invalid Payment Method",
    },
    default: function () {
      return this.paymentMethod === PaymentMethod.COD
        ? OrderStatus.PENDING
        : OrderStatus.PENDING;
    },
  })
  paymentMethod: PaymentMethod;

  @Prop({
    type: Number,
    required: true,
  })
  subTotal: number;

  @Prop({
    type: Number,
    required: true,
  })
  discount: number;

  @Prop({
    type: Number,
  })
  totalPrice: number;

  @Prop({
    type: String,
  })
  intentId: string;

  @Prop({
    type: String,
  })
  refundId: string;

  @Prop({ type: Date })
  refundAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export type HOrderDocument = HydratedDocument<Order>;

export const OrderModel = MongooseModule.forFeature([
  {
    name: Order.name,
    schema: OrderSchema,
  },
]);
