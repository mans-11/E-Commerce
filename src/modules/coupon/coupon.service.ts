import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart } from "src/DB/models/cart.model";
import { Coupon } from "src/DB/models/coupon.model";
import { CreateCouponDto } from "./dto/create-coupon.dto";

@Injectable()
export class CouponService {
  constructor(
    @InjectModel(Coupon.name) private readonly couponModel: Model<Coupon>,
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    @Inject(REQUEST) private readonly request,
  ) {}

  async create(createCouponDto: CreateCouponDto) {
    const coupon = await this.couponModel.findOne({
      code: createCouponDto.code,
    });

    if (coupon) throw new ConflictException("Coupon code already exists");
    const newCoupon = await this.couponModel.create(createCouponDto);

    return newCoupon;
  }

  async findOne(code: string) {
    const coupon = await this.couponModel.findById(code);
    if (!coupon) throw new ConflictException("Coupon not found");
    return coupon;
  }

  async findAll() {
    const coupons = await this.couponModel.find();
    return coupons;
  }

  async applyCoupon(code: string) {
    const cart = await this.cartModel.findOne({ user: this.request.user._id });

    if (!cart || !cart.items.length)
      throw new NotFoundException("Cart not found");

    const coupon = await this.couponModel.findOne({
      code: code,
      isActive: true,
    });

    if (!coupon) throw new NotFoundException("Coupon not found");
    const currentDate = new Date();

    if (coupon.expireAt < currentDate)
      throw new BadRequestException("Coupon has expired");

    const discountAmount = (cart.subTotal * coupon.discountPercentage) / 100;
    cart.totalPrice = cart.subTotal - discountAmount;
    return await cart.save();
  }

  async deActivateCoupon(id: string) {
    const coupon = await this.couponModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!coupon) throw new NotFoundException("Coupon not found");
    return coupon;
  }
}
