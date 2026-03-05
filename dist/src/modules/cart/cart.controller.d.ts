import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    addIteamToCart(createCartDto: CreateCartDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../DB/models/cart.model").Cart, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/cart.model").Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../DB/models/cart.model").Cart, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/cart.model").Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getCart(): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../DB/models/cart.model").Cart, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/cart.model").Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../DB/models/cart.model").Cart, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/cart.model").Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateItemQuantity(productId: string, quantity: number): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../DB/models/cart.model").Cart, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/cart.model").Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../DB/models/cart.model").Cart, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/cart.model").Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removeItemFromCart(productId: string): Promise<void>;
    clearCart(): Promise<void>;
}
