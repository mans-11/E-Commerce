import { IProduct } from "lib/product/product.interface";
import mongoose, { HydratedDocument, Types } from "mongoose";
export declare class Product implements IProduct {
    name: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    stock: number;
    createdBy: Types.ObjectId;
    images: string[];
    category: Types.ObjectId;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, (mongoose.Document<unknown, any, Product, any, mongoose.DefaultSchemaOptions> & Product & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, Product, any, mongoose.DefaultSchemaOptions> & Product & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Product>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, mongoose.Document<unknown, {}, Product, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Product & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: mongoose.SchemaDefinitionProperty<string, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    slug?: mongoose.SchemaDefinitionProperty<string, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: mongoose.SchemaDefinitionProperty<string, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    price?: mongoose.SchemaDefinitionProperty<number, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    quantity?: mongoose.SchemaDefinitionProperty<number, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    stock?: mongoose.SchemaDefinitionProperty<number, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<Types.ObjectId, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    images?: mongoose.SchemaDefinitionProperty<string[], Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    category?: mongoose.SchemaDefinitionProperty<Types.ObjectId, Product, mongoose.Document<unknown, {}, Product, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Product>;
export type HProductDocument = HydratedDocument<Product>;
export declare const ProductModel: import("@nestjs/common").DynamicModule;
