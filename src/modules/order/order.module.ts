import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthGuard } from "src/common/guard/auth.guard";
import { Cart, CartSchema } from "src/DB/models/cart.model";
import { Order, OrderSchema } from "src/DB/models/order.model";
import Stripe from "stripe";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cart.name, schema: CartSchema },
      { name: Order.name, schema: OrderSchema },
    ]),
  ],
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService, AuthGuard, JwtService, Stripe],
})
export class OrderModule {}
