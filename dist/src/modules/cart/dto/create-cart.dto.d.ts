import { ICartIteam } from "lib/cart/create-cart.interface";
import { Types } from "mongoose";
export declare class CreateCartDto implements ICartIteam {
    product: Types.ObjectId;
    quantity: number;
}
