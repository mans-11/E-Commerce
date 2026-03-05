import { Model } from "mongoose";
import { Cart, HCartDocument } from "src/DB/models/cart.model";
import { Product } from "src/DB/models/products.model";
import { CreateCartDto } from "./dto/create-cart.dto";
export declare class CartService {
    private readonly productModel;
    private readonly cartModel;
    private readonly request;
    constructor(productModel: Model<Product>, cartModel: Model<HCartDocument>, request: any);
    addItemToCart(createCartDto: CreateCartDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Cart, {}, import("mongoose").DefaultSchemaOptions> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Cart, {}, import("mongoose").DefaultSchemaOptions> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateItemQuantity(id: string, quantity: number): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Cart, {}, import("mongoose").DefaultSchemaOptions> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Cart, {}, import("mongoose").DefaultSchemaOptions> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeItemFromCart(productId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Cart, {}, import("mongoose").DefaultSchemaOptions> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Cart, {}, import("mongoose").DefaultSchemaOptions> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    clearCart(): Promise<import("mongodb").DeleteResult>;
    getCart(): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Cart, {}, import("mongoose").DefaultSchemaOptions> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Cart, {}, import("mongoose").DefaultSchemaOptions> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    private checkUserExistence;
}
