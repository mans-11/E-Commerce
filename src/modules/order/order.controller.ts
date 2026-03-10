import { Body, Controller, Param, Post, Req, UseGuards } from "@nestjs/common";
import { Types } from "mongoose";
import { AuthGuard } from "src/common/guard/auth.guard";
import { CreateOrderDto } from "./dto/create-order.dto";
import { OrderService } from "./order.service";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Post(":id/cancel")
  cancelOrder(@Param("id") id: string) {
    return this.orderService.cancelOrder(id);
  }

  @Post(":id/update-address")
  updateOrderAddress(@Param("id") id: string, @Body() address: string) {
    return this.orderService.updateOrderAddress(id, address);
  }

  @Post("checkout/:orderId")
  @UseGuards(AuthGuard)
  createCheckoutSession(@Param("orderId") orderId: Types.ObjectId, @Req() req) {
    const userId = req.user._id;
    const session = this.orderService.createCheckoutSession(orderId, userId);
    return session;
  }

  @Post("refund/:orderId")
  @UseGuards(AuthGuard)
  refundOrder(@Param("orderId") orderId: Types.ObjectId, @Req() req) {
    const userId = req.user._id;
    const refund = this.orderService.refundOrder(orderId, userId);
    return refund;
  }
}
