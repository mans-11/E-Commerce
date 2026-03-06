import { ICoupon } from "lib/coupon/coupon.interface";
import { HydratedDocument } from "mongoose";
export declare class Coupon implements ICoupon {
    code: string;
    discountPercentage: number;
    expireAt: Date;
    isActive: boolean;
}
export declare const CouponSchema: import("mongoose").Schema<Coupon, import("mongoose").Model<Coupon, any, any, any, (import("mongoose").Document<unknown, any, Coupon, any, import("mongoose").DefaultSchemaOptions> & Coupon & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (import("mongoose").Document<unknown, any, Coupon, any, import("mongoose").DefaultSchemaOptions> & Coupon & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Coupon>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Coupon, import("mongoose").Document<unknown, {}, Coupon, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Coupon & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    code?: import("mongoose").SchemaDefinitionProperty<string, Coupon, import("mongoose").Document<unknown, {}, Coupon, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    discountPercentage?: import("mongoose").SchemaDefinitionProperty<number, Coupon, import("mongoose").Document<unknown, {}, Coupon, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expireAt?: import("mongoose").SchemaDefinitionProperty<Date, Coupon, import("mongoose").Document<unknown, {}, Coupon, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, Coupon, import("mongoose").Document<unknown, {}, Coupon, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Coupon>;
export type HCouponDocument = HydratedDocument<Coupon>;
export declare const CouponModel: import("@nestjs/common").DynamicModule;
