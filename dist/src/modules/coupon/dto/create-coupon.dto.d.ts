import { ICreateCoupon } from "lib/coupon/create-coupon.interface";
export declare class CreateCouponDto implements ICreateCoupon {
    code: string;
    discountPercentage: number;
    expireAt: Date;
    isActive?: boolean;
}
