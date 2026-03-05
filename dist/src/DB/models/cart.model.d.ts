import { ICart } from "lib/cart/catr.interface";
import mongoose, { HydratedDocument, Types } from "mongoose";
export declare class CartIteam {
    product: Types.ObjectId;
    quantity: number;
}
export declare class Cart implements ICart {
    user: Types.ObjectId;
    subTotal: number;
    totalPrice: number;
    items: CartIteam[];
}
export declare const CartSchema: mongoose.Schema<Cart, mongoose.Model<Cart, any, any, any, (mongoose.Document<unknown, any, Cart, any, mongoose.DefaultSchemaOptions> & Cart & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, Cart, any, mongoose.DefaultSchemaOptions> & Cart & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Cart>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Cart, mongoose.Document<unknown, {}, Cart, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Cart & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    user?: mongoose.SchemaDefinitionProperty<Types.ObjectId, Cart, mongoose.Document<unknown, {}, Cart, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Cart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subTotal?: mongoose.SchemaDefinitionProperty<number, Cart, mongoose.Document<unknown, {}, Cart, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Cart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalPrice?: mongoose.SchemaDefinitionProperty<number, Cart, mongoose.Document<unknown, {}, Cart, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Cart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    items?: mongoose.SchemaDefinitionProperty<CartIteam[], Cart, mongoose.Document<unknown, {}, Cart, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Cart & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Cart>;
export type HCartDocument = HydratedDocument<Cart>;
export declare const CartModel: import("@nestjs/common").DynamicModule;
