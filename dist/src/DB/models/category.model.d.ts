import mongoose, { HydratedDocument, Types } from "mongoose";
export declare class Category {
    name: string;
    slug: string;
    description: string;
    createdBy: Types.ObjectId;
    image: string;
    brands: Types.ObjectId[];
}
export declare const CategorySchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, (mongoose.Document<unknown, any, Category, any, mongoose.DefaultSchemaOptions> & Category & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, Category, any, mongoose.DefaultSchemaOptions> & Category & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Category>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Category, mongoose.Document<unknown, {}, Category, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Category & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: mongoose.SchemaDefinitionProperty<string, Category, mongoose.Document<unknown, {}, Category, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    slug?: mongoose.SchemaDefinitionProperty<string, Category, mongoose.Document<unknown, {}, Category, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: mongoose.SchemaDefinitionProperty<string, Category, mongoose.Document<unknown, {}, Category, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<Types.ObjectId, Category, mongoose.Document<unknown, {}, Category, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    image?: mongoose.SchemaDefinitionProperty<string, Category, mongoose.Document<unknown, {}, Category, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    brands?: mongoose.SchemaDefinitionProperty<Types.ObjectId[], Category, mongoose.Document<unknown, {}, Category, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Category & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Category>;
export type HCategoryDocument = HydratedDocument<Category>;
export declare const CategoryModel: import("@nestjs/common").DynamicModule;
