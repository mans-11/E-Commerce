import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ICreateProduct } from "lib/product/create-product.interface";
import { Types } from "mongoose";

export class CreateProductDto implements ICreateProduct {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images: string[];
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(5000)
  description: string;
  @IsNumber()
  @Type(() => Number)
  stock: number;
  @IsNotEmpty()
  @IsMongoId()
  @Type(() => Types.ObjectId)
  category: Types.ObjectId;
  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
