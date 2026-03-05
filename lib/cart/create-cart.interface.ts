import { Types } from "mongoose";

export interface ICreateCart {
  items: ICartIteam[];
}

export interface ICartIteam {
  product: Types.ObjectId;
  quantity: number;
}
