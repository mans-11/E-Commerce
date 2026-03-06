import { Type } from "class-transformer";
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import {
  ICreateOrder,
  ICreateOrderItems,
  OrderStatus,
  PaymentMethod,
} from "lib/order/create-order.interface";
import { Types } from "mongoose";

export class CreateOrderDto implements ICreateOrder {
  @IsMongoId()
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  cart: Types.ObjectId;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEnum(OrderStatus)
  paymentMethod: PaymentMethod;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  subtotal: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  totalPrice: number;
}

export class CreateOrderItemsDto implements ICreateOrderItems {
  @IsMongoId()
  @IsNotEmpty()
  @Type(() => Types.ObjectId)
  product: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;
}
