import { JwtService } from "@nestjs/jwt";
import { Model, Types } from "mongoose";
import { HOtpDocument } from "src/DB/models/otp.model";
import { HUserDocument, User } from "src/DB/models/user.model";
export declare class AuthService {
    private readonly userModel;
    private readonly otpModel;
    private JwtServce;
    constructor(userModel: Model<HUserDocument>, otpModel: Model<HOtpDocument>, JwtServce: JwtService);
    createOtp(userId: Types.ObjectId): Promise<void>;
    signup(body: any): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    resendOtp(resnedOtp: any): Promise<{
        message: string;
        checkUser: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, User, {}, import("mongoose").DefaultSchemaOptions> & User & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: Types.ObjectId;
        }>;
    }>;
    confirmEmail(confirmEmail: any): Promise<{
        message: string;
    }>;
    login(login: any): Promise<{
        message: string;
        credentials: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    getProfile(req: any): Promise<{
        message: string;
        data: any;
    }>;
    uploadfile(file: Express.Multer.File): Promise<{
        message: string;
        data: Express.Multer.File;
    }>;
    uploadCovers(files: Array<Express.Multer.File>): Promise<{
        message: string;
        data: Express.Multer.File[];
    }>;
}
