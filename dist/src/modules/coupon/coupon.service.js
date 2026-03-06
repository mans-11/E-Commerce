"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_model_1 = require("../../DB/models/cart.model");
const coupon_model_1 = require("../../DB/models/coupon.model");
let CouponService = class CouponService {
    couponModel;
    cartModel;
    request;
    constructor(couponModel, cartModel, request) {
        this.couponModel = couponModel;
        this.cartModel = cartModel;
        this.request = request;
    }
    async create(createCouponDto) {
        const coupon = await this.couponModel.findOne({
            code: createCouponDto.code,
        });
        if (coupon)
            throw new common_1.ConflictException("Coupon code already exists");
        const newCoupon = await this.couponModel.create(createCouponDto);
        return newCoupon;
    }
    async findOne(code) {
        const coupon = await this.couponModel.findById(code);
        if (!coupon)
            throw new common_1.ConflictException("Coupon not found");
        return coupon;
    }
    async findAll() {
        const coupons = await this.couponModel.find();
        return coupons;
    }
    async applyCoupon(code) {
        const cart = await this.cartModel.findOne({ user: this.request.user._id });
        if (!cart || !cart.items.length)
            throw new common_1.NotFoundException("Cart not found");
        const coupon = await this.couponModel.findOne({
            code: code,
            isActive: true,
        });
        if (!coupon)
            throw new common_1.NotFoundException("Coupon not found");
        const currentDate = new Date();
        if (coupon.expireAt < currentDate)
            throw new common_1.BadRequestException("Coupon has expired");
        const discountAmount = (cart.subTotal * coupon.discountPercentage) / 100;
        cart.totalPrice = cart.subTotal - discountAmount;
        return await cart.save();
    }
    async deActivateCoupon(id) {
        const coupon = await this.couponModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!coupon)
            throw new common_1.NotFoundException("Coupon not found");
        return coupon;
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(coupon_model_1.Coupon.name)),
    __param(1, (0, mongoose_1.InjectModel)(cart_model_1.Cart.name)),
    __param(2, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model, Object])
], CouponService);
//# sourceMappingURL=coupon.service.js.map