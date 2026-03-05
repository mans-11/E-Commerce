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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const crypto_1 = require("crypto");
const mongoose_2 = require("mongoose");
const user_enum_1 = require("../../common/enums/user.enum");
const hash_1 = require("../../common/utils/hashing/hash");
const otp_utils_1 = require("../../common/utils/otp.utils");
const otp_model_1 = require("../../DB/models/otp.model");
const user_model_1 = require("../../DB/models/user.model");
let AuthService = class AuthService {
    userModel;
    otpModel;
    JwtServce;
    constructor(userModel, otpModel, JwtServce) {
        this.userModel = userModel;
        this.otpModel = otpModel;
        this.JwtServce = JwtServce;
    }
    async createOtp(userId) {
        await this.otpModel.create({
            createdBy: userId,
            code: (0, otp_utils_1.generateOtp)(),
            expiredAt: new Date(Date.now() + 2 * 60 * 1000),
            type: user_enum_1.OTPEnum.EMAIL_VERIFICATION,
        });
    }
    async signup(body) {
        const { firstName, lastName, email, password, confirmPassword } = body;
        const checkUser = await this.userModel.findOne({ email });
        if (checkUser) {
            throw new common_1.ConflictException("user already exists");
        }
        const user = await this.userModel.create({
            firstName,
            lastName,
            email,
            password,
        });
        await this.createOtp(user._id);
        return { message: "User Signedup Successfully", user };
    }
    async resendOtp(resnedOtp) {
        const { email } = resnedOtp;
        const checkUser = await this.userModel
            .findOne({
            email,
            confirmEmail: { $exists: false },
        })
            .populate([{ path: "otp", match: { type: user_enum_1.OTPEnum.EMAIL_VERIFICATION } }]);
        if (!checkUser) {
            throw new common_1.ConflictException("User Not Found");
        }
        if (checkUser.otp?.length)
            throw new common_1.ConflictException("OTP Already Exists");
        await this.createOtp(checkUser._id);
        return { message: "otp sent Successfully", checkUser };
    }
    async confirmEmail(confirmEmail) {
        const { email, otp } = confirmEmail;
        const user = await this.userModel
            .findOne({
            email,
            confirmEmail: { $exists: false },
        })
            .populate([{ path: "otp", match: { type: user_enum_1.OTPEnum.EMAIL_VERIFICATION } }]);
        if (!user)
            throw new common_1.NotFoundException("User Not Found");
        if (!user.otp?.length)
            throw new common_1.NotFoundException("Otp Not Found");
        if (!(await (0, hash_1.compare)(otp, user.otp[0].code)))
            throw new common_1.NotFoundException("Invalid OTP");
        await this.userModel.updateOne({ _id: user._id }, {
            $set: { confirmEmail: new Date() },
            $inc: { __v: 1 },
        });
        return { message: "User Confirmed Successfully" };
    }
    async login(login) {
        const { email, password } = login;
        const user = await this.userModel.findOne({
            email,
            confirmEmail: { $exists: true },
            provider: user_enum_1.ProviderEnum.SYSTEM,
        });
        if (!user)
            throw new common_1.NotFoundException("User Not Found");
        if (!(await (0, hash_1.compare)(password, user.password)))
            throw new common_1.BadRequestException("Invalid Email Or Password");
        const jwtid = (0, crypto_1.randomUUID)();
        const accessToken = this.JwtServce.sign({
            id: user._id,
            email: user.email,
        }, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: Number(process.env.ACCESS_EXPIRES_AT),
            jwtid,
        });
        const refreshToken = this.JwtServce.sign({
            id: user._id,
            email: user.email,
        }, {
            secret: process.env.REFRESH_TOKEN_SECRET,
            expiresIn: Number(process.env.REFRESH_EXPIRES_AT),
            jwtid,
        });
        return {
            message: "User Loggedin Succcessfully",
            credentials: { accessToken, refreshToken },
        };
    }
    async getProfile(req) {
        return { message: "Profile Fetched Successfully", data: req.user };
    }
    async uploadfile(file) {
        return { message: "File Uploaded Successsfully", data: file };
    }
    async uploadCovers(files) {
        return { message: "File Uploaded Successsfully", data: files };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(otp_model_1.Otp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map