import { ICartIteam } from "lib/cart/create-cart.interface";
import { type IProduct } from "lib/product/product.interface";
export declare class CreateCartDto implements ICartIteam {
    product: IProduct;
    quantity: number;
}
