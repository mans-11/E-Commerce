import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, CartSchema } from "src/DB/models/cart.model";
import { Otp, OtpSchema } from "src/DB/models/otp.model";
import { Product, ProductSchema } from "src/DB/models/products.model";
import { User, UserSchema } from "src/DB/models/user.model";
import { AuthService } from "../auth/auth.service";
import { CartController } from "./cart.controller";
import { CartService } from "./cart.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Cart.name, schema: CartSchema },
      { name: User.name, schema: UserSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, AuthService, JwtService],
})
export class CartModule {}
