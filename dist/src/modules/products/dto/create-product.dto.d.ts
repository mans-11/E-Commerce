import { ICreateProduct } from "lib/product/create-product.interface";
import { Types } from "mongoose";
export declare class CreateProductDto implements ICreateProduct {
    name: string;
    price: number;
    images: string[];
    quantity: number;
    description: string;
    stock: number;
    category: Types.ObjectId;
    createdBy: string;
}
