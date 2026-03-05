import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { randomUUID } from "crypto";
import { Model, Types } from "mongoose";
import { OTPEnum, ProviderEnum } from "src/common/enums/user.enum";
import { compare } from "src/common/utils/hashing/hash";
import { generateOtp } from "src/common/utils/otp.utils";
import { HOtpDocument, Otp } from "src/DB/models/otp.model";
import { HUserDocument, User } from "src/DB/models/user.model";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<HUserDocument>,
    @InjectModel(Otp.name) private readonly otpModel: Model<HOtpDocument>,
    private JwtServce: JwtService,
  ) {}

  async createOtp(userId: Types.ObjectId) {
    await this.otpModel.create({
      createdBy: userId,
      code: generateOtp(),
      expiredAt: new Date(Date.now() + 2 * 60 * 1000),
      type: OTPEnum.EMAIL_VERIFICATION,
    });
  }

  async signup(body: any) {
    const { firstName, lastName, email, password, confirmPassword } = body;
    const checkUser = await this.userModel.findOne({ email });
    if (checkUser) {
      throw new ConflictException("user already exists");
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

  async resendOtp(resnedOtp: any) {
    const { email } = resnedOtp;
    const checkUser = await this.userModel
      .findOne({
        email,
        confirmEmail: { $exists: false },
      })
      .populate([{ path: "otp", match: { type: OTPEnum.EMAIL_VERIFICATION } }]);

    if (!checkUser) {
      throw new ConflictException("User Not Found");
    }
    if (checkUser.otp?.length)
      throw new ConflictException("OTP Already Exists");

    await this.createOtp(checkUser._id);

    return { message: "otp sent Successfully", checkUser };
  }

  async confirmEmail(confirmEmail: any) {
    const { email, otp } = confirmEmail;
    const user = await this.userModel
      .findOne({
        email,
        confirmEmail: { $exists: false },
      })
      .populate([{ path: "otp", match: { type: OTPEnum.EMAIL_VERIFICATION } }]);

    if (!user) throw new NotFoundException("User Not Found");
    if (!user.otp?.length) throw new NotFoundException("Otp Not Found");
    if (!(await compare(otp, user.otp[0].code)))
      throw new NotFoundException("Invalid OTP");
    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: { confirmEmail: new Date() },
        $inc: { __v: 1 },
      },
    );
    return { message: "User Confirmed Successfully" };
  }

  async login(login: any) {
    const { email, password } = login;
    const user = await this.userModel.findOne({
      email,
      confirmEmail: { $exists: true },
      provider: ProviderEnum.SYSTEM,
    });
    if (!user) throw new NotFoundException("User Not Found");
    if (!(await compare(password, user.password)))
      throw new BadRequestException("Invalid Email Or Password");
    const jwtid = randomUUID();
    const accessToken = this.JwtServce.sign(
      {
        id: user._id,
        email: user.email,
      },
      {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: Number(process.env.ACCESS_EXPIRES_AT),
        jwtid,
      },
    );
    const refreshToken = this.JwtServce.sign(
      {
        id: user._id,
        email: user.email,
      },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: Number(process.env.REFRESH_EXPIRES_AT),
        jwtid,
      },
    );
    return {
      message: "User Loggedin Succcessfully",
      credentials: { accessToken, refreshToken },
    };
  }

  async getProfile(req: any) {
    return { message: "Profile Fetched Successfully", data: req.user };
  }

  async uploadfile(file: Express.Multer.File) {
    return { message: "File Uploaded Successsfully", data: file };
  }

  async uploadCovers(files: Array<Express.Multer.File>) {
    return { message: "File Uploaded Successsfully", data: files };
  }
}
