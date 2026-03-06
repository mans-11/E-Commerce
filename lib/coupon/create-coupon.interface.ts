export interface ICreateCoupon {
  code: string;
  discountPercentage: number;
  expireAt: Date;
  isActive?: boolean;
}
