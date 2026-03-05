import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Model } from "mongoose";
import { HUserDocument } from "src/DB/models/user.model";
export declare class AuthGuard implements CanActivate {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<HUserDocument>, jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
