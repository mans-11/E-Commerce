import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Category } from "src/DB/models/category.model";
import { Product, ProductSchema } from "src/DB/models/products.model";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: ProductSchema },
    ]),
  ],
  exports: [],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
