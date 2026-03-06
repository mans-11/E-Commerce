"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const cart_model_1 = require("../../DB/models/cart.model");
const coupon_model_1 = require("../../DB/models/coupon.model");
const otp_model_1 = require("../../DB/models/otp.model");
const user_model_1 = require("../../DB/models/user.model");
const auth_service_1 = require("../auth/auth.service");
const coupon_controller_1 = require("./coupon.controller");
const coupon_service_1 = require("./coupon.service");
let CouponModule = class CouponModule {
};
exports.CouponModule = CouponModule;
exports.CouponModule = CouponModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: cart_model_1.Cart.name, schema: cart_model_1.CartSchema },
                { name: coupon_model_1.Coupon.name, schema: coupon_model_1.CouponSchema },
                { name: user_model_1.User.name, schema: user_model_1.UserSchema },
                { name: otp_model_1.Otp.name, schema: otp_model_1.OtpSchema },
            ]),
        ],
        controllers: [coupon_controller_1.CouponController],
        providers: [coupon_service_1.CouponService, auth_service_1.AuthService, jwt_1.JwtService],
    })
], CouponModule);
//# sourceMappingURL=coupon.module.js.map