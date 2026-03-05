import mongoose, { HydratedDocument, Types } from "mongoose";
export declare class Otp {
    code: string;
    expiredAt: Date;
    createdBy: Types.ObjectId;
    type: string;
}
export declare const OtpSchema: mongoose.Schema<Otp, mongoose.Model<Otp, any, any, any, (mongoose.Document<unknown, any, Otp, any, mongoose.DefaultSchemaOptions> & Otp & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (mongoose.Document<unknown, any, Otp, any, mongoose.DefaultSchemaOptions> & Otp & {
    _id: Types.ObjectId;
} & {
    __v: number;
}), any, Otp>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Otp, mongoose.Document<unknown, {}, Otp, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<Otp & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    code?: mongoose.SchemaDefinitionProperty<string, Otp, mongoose.Document<unknown, {}, Otp, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Otp & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expiredAt?: mongoose.SchemaDefinitionProperty<Date, Otp, mongoose.Document<unknown, {}, Otp, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Otp & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: mongoose.SchemaDefinitionProperty<Types.ObjectId, Otp, mongoose.Document<unknown, {}, Otp, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Otp & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    type?: mongoose.SchemaDefinitionProperty<string, Otp, mongoose.Document<unknown, {}, Otp, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<Otp & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Otp>;
export type HOtpDocument = HydratedDocument<Otp>;
export declare const OtpModel: import("@nestjs/common").DynamicModule;
