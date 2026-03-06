import { Model } from "mongoose";
import { Cart } from "src/DB/models/cart.model";
import { Coupon } from "src/DB/models/coupon.model";
import { CreateCouponDto } from "./dto/create-coupon.dto";
export declare class CouponService {
    private readonly couponModel;
    private readonly cartModel;
    private readonly request;
    constructor(couponModel: Model<Coupon>, cartModel: Model<Cart>, request: any);
    create(createCouponDto: CreateCouponDto): Promise<import("mongoose").Document<unknown, {}, Coupon, {}, import("mongoose").DefaultSchemaOptions> & Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findOne(code: string): Promise<import("mongoose").Document<unknown, {}, Coupon, {}, import("mongoose").DefaultSchemaOptions> & Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Coupon, {}, import("mongoose").DefaultSchemaOptions> & Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    applyCoupon(code: string): Promise<import("mongoose").Document<unknown, {}, Cart, {}, import("mongoose").DefaultSchemaOptions> & Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    deActivateCoupon(id: string): Promise<import("mongoose").Document<unknown, {}, Coupon, {}, import("mongoose").DefaultSchemaOptions> & Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
