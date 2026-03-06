import { Types } from "mongoose";
import { ICartIteam, ICreateCart } from "./create-cart.interface";
export interface ICart extends Omit<ICreateCart, "items"> {
    user: Types.ObjectId;
    subTotal: number;
    totalPrice: number;
    items: ICartIteam[];
}
