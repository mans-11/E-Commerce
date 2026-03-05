import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { OtpModel } from "src/DB/models/otp.model";
import { UserModel } from "src/DB/models/user.model";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [UserModel, OtpModel],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [],
})
export class AuthModule {}
