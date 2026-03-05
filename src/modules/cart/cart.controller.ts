import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "src/common/guard/auth.guard";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(AuthGuard)
  addIteamToCart(@Body() createCartDto: CreateCartDto) {
    return this.cartService.addItemToCart(createCartDto);
  }

  @Get()
  getCart() {
    return this.cartService.getCart();
  }

  @Patch(":productId")
  async updateItemQuantity(
    @Param("productId") productId: string,
    @Body("quantity") quantity: number,
  ) {
    return this.cartService.updateItemQuantity(productId, quantity);
  }

  @Delete(":productId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeItemFromCart(@Param("productId") productId: string) {
    await this.cartService.removeItemFromCart(productId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async clearCart() {
    await this.cartService.clearCart();
  }
}
