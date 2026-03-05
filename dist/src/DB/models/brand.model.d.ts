import mongoose, { HydratedDocument, Types } from "mongoose";
export declare class Brand {
    name: string;
    slug: string;
    createdBy: Types.ObjectId;
    image: string;
}
export declare const BrandSchema: mongoose.Schema<Brand, mongoose.Model<Brand, any, any, any, (mongoose.Document<unknown, any, Brand, any, mongoose.DefaultSchemaOptions> & Brand & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, Brand, any, mongoose.DefaultSchemaOptions> & Brand & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Brand>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Brand, mongoose.Document<unknown, {}, Brand, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Brand & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: mongoose.SchemaDefinitionProperty<string, Brand, mongoose.Document<unknown, {}, Brand, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    slug?: mongoose.SchemaDefinitionProperty<string, Brand, mongoose.Document<unknown, {}, Brand, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<Types.ObjectId, Brand, mongoose.Document<unknown, {}, Brand, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    image?: mongoose.SchemaDefinitionProperty<string, Brand, mongoose.Document<unknown, {}, Brand, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Brand>;
export type HBrandDocument = HydratedDocument<Brand>;
export declare const BrandModel: import("@nestjs/common").DynamicModule;
