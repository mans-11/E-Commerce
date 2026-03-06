import { IProduct } from "lib/product/product.interface";
import { Types } from "mongoose";

export interface ICreateCart {
  items: ICreateCartItem[];
}
export interface ICreateCartItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface ICartIteam {
  product: IProduct;
  quantity: number;
}
