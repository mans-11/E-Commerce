import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  ICreateOrderItems,
  OrderStatus,
  PaymentMethod,
} from "lib/order/create-order.interface";
import { IOrder } from "lib/order/order-interface";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Cart } from "./cart.model";

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
    type: String,
    required: true,
    enum: OrderStatus,
  })
  orderStatus: OrderStatus;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Cart.name,
  })
  cart: Types.ObjectId;
  @Prop({
    type: String,
    required: true,
  })
  address: string;

  @Prop({
    type: String,
    required: true,
    enum: PaymentMethod,
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
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

export type HOrderDocument = HydratedDocument<Order>;

export const OrderModel = MongooseModule.forFeature([
  {
    name: Order.name,
    schema: OrderSchema,
  },
]);
