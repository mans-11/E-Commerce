import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "src/common/guard/auth.guard";
import { CouponService } from "./coupon.service";
import { CreateCouponDto } from "./dto/create-coupon.dto";

@Controller("coupon")
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  create(@Body(new ValidationPipe()) createCouponDto: CreateCouponDto) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Get(":code")
  findOne(@Param("code") code: string) {
    return this.couponService.findOne(code);
  }
  @UseGuards(AuthGuard)
  @Patch(":code")
  update(@Param("code") code: string) {
    return this.couponService.applyCoupon(code);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.couponService.deActivateCoupon(id);
  }
}
