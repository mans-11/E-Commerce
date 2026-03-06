import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ICart } from "lib/cart/catr.interface";
import { ICartIteam } from "lib/cart/create-cart.interface";
import { type IProduct } from "lib/product/product.interface";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Product } from "./products.model";
import { User } from "./user.model";

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class CartIteam implements ICartIteam {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Product.name,
    required: true,
  })
  product: IProduct;
  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Cart implements ICart {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
    unique: true,
  })
  user: Types.ObjectId;
  @Prop({
    type: Number,
  })
  subTotal: number;
  @Prop({
    type: Number,
  })
  totalPrice: number;

  @Prop({ type: [SchemaFactory.createForClass(CartIteam)], default: [] })
  items: ICartIteam[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);

export type HCartDocument = HydratedDocument<Cart>;

export const CartModel = MongooseModule.forFeature([
  {
    name: Cart.name,
    schema: CartSchema,
  },
]);
