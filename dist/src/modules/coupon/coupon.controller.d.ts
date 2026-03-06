import { CouponService } from "./coupon.service";
import { CreateCouponDto } from "./dto/create-coupon.dto";
export declare class CouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    create(createCouponDto: CreateCouponDto): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/coupon.model").Coupon, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/coupon.model").Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../../DB/models/coupon.model").Coupon, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/coupon.model").Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(code: string): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/coupon.model").Coupon, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/coupon.model").Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(code: string): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/cart.model").Cart, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/cart.model").Cart & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/coupon.model").Coupon, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/coupon.model").Coupon & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
