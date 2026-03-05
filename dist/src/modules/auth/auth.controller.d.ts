import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: any): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../DB/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../DB/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>;
    }>;
    resendOtp(resendOtp: any): Promise<{
        message: string;
        checkUser: import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../DB/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../DB/models/user.model").User, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/user.model").User & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & {
            id: string;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
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
    uploadCovers(files: Express.Multer.File[]): Express.Multer.File[];
}
