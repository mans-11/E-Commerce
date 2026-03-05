import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber } from "class-validator";
import { ICartIteam } from "lib/cart/create-cart.interface";
import { Types } from "mongoose";

export class CreateCartDto implements ICartIteam {
  @IsMongoId()
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  product: Types.ObjectId;
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  quantity: number;
}
