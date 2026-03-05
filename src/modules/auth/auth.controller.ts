import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "src/common/guard/auth.guard";
import { LoggingInterceptor } from "src/common/interceptor/logger.interceptor";
import {
  UploadImage,
  UploadImages,
} from "src/common/interceptor/multer/cloud.multer";
import { ResponseInterceptor } from "src/common/interceptor/response.interceptor";
import { AuthService } from "./auth.service";

@UseInterceptors(LoggingInterceptor, ResponseInterceptor)
@Controller("/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  signup(@Body() body: any) {
    return this.authService.signup(body);
  }

  @Post("/resend-otp")
  async resendOtp(@Body() resendOtp: any) {
    return await this.authService.resendOtp(resendOtp);
  }

  @Patch("/confirm-email")
  async confirmEmail(@Body() confirmEmail: any) {
    return await this.authService.confirmEmail(confirmEmail);
  }

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() login: any) {
    return await this.authService.login(login);
  }

  @Get("/profile")
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: any) {
    return await this.authService.getProfile(req);
  }
  @Post("/upload-profile")
  @UploadImage({
    fieldName: "profile-image",
    destination: "./src/uploads/user-profile",
  })
  async uploadfile(@UploadedFile() file: Express.Multer.File) {
    return this.authService.uploadfile(file);
  }

  @Post("upload-coves")
  @UploadImages({
    destination: "./src/uploads/covers",
    maxCount: 10,
  })
  uploadCovers(@UploadedFiles() files: Express.Multer.File[]) {
    return files;
  }
}
