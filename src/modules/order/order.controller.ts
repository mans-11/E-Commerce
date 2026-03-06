import { Body, Controller, Param, Post } from "@nestjs/common";
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
}
