import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ICoupon } from "lib/coupon/coupon.interface";
import { HydratedDocument } from "mongoose";

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Coupon implements ICoupon {
  @Prop({
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    uppercase: true,
  })
  code: string;

  @Prop({
    type: Number,
    required: true,
  })
  discountPercentage: number;

  @Prop({
    type: Date,
  })
  expireAt: Date;
  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: boolean;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);

export type HCouponDocument = HydratedDocument<Coupon>;

export const CouponModel = MongooseModule.forFeature([
  {
    name: Coupon.name,
    schema: CouponSchema,
  },
]);
