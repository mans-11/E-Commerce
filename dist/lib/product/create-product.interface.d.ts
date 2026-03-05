import { Types } from "mongoose";
export interface ICreateProduct {
    name: string;
    price: number;
    images: string[];
    quantity: number;
    description: string;
    stock: number;
    category: Types.ObjectId;
}
