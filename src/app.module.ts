import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { resolve } from "node:path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";

import { MongooseModule } from "@nestjs/mongoose";
import { BrandModule } from "./modules/brand/brand.module";
import { CartModule } from "./modules/cart/cart.module";
import { CategoryModule } from "./modules/category/category.module";
import { CouponModule } from "./modules/coupon/coupon.module";
import { OrderModule } from "./modules/order/order.module";
import { ProductsModule } from "./modules/products/products.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve("./config/dev.env"),
      isGlobal: true,
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.DB_URi as string, {
      serverSelectionTimeoutMS: 5000,
      onConnectionCreate(connection) {
        connection.on("connected", () => {
          console.log("MongoDB Connected Successfully");
        });
      },
    }),
    AuthModule,
    UserModule,
    BrandModule,
    CategoryModule,
    ProductsModule,
    CartModule,
    CouponModule,
    OrderModule,
    // PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
