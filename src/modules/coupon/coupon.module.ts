import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, CartSchema } from "src/DB/models/cart.model";
import { Coupon, CouponSchema } from "src/DB/models/coupon.model";
import { Otp, OtpSchema } from "src/DB/models/otp.model";
import { User, UserSchema } from "src/DB/models/user.model";
import { AuthService } from "../auth/auth.service";
import { CouponController } from "./coupon.controller";
import { CouponService } from "./coupon.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: Coupon.name, schema: CouponSchema },
      { name: User.name, schema: UserSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
  ],
  controllers: [CouponController],
  providers: [CouponService, AuthService, JwtService],
})
export class CouponModule {}
