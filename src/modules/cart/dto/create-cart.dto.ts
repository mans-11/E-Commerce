import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber } from "class-validator";
import { ICartIteam } from "lib/cart/create-cart.interface";
import { type IProduct } from "lib/product/product.interface";
import { Types } from "mongoose";

export class CreateCartDto implements ICartIteam {
  @IsMongoId()
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  product: IProduct;
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;
}
