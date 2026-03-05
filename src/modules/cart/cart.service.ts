import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart, HCartDocument } from "src/DB/models/cart.model";
import { Product } from "src/DB/models/products.model";
import { CreateCartDto } from "./dto/create-cart.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Cart.name) private readonly cartModel: Model<HCartDocument>,
    @Inject(REQUEST) private readonly request: any,
  ) {}

  async addItemToCart(createCartDto: CreateCartDto) {
    const userId = this.request.user?._id;
    if (!userId) throw new UnauthorizedException("User not authenticated");

    const product = await this.productModel.findById(createCartDto.product);
    if (!product) throw new BadRequestException("Product not found");

    if (createCartDto.quantity > product.stock) {
      throw new BadRequestException("Stock Is Not Enough");
    }

    let cart = await this.cartModel.findOne({ user: userId });

    if (!cart) {
      cart = await this.cartModel.create({
        user: userId,
        items: [
          { product: createCartDto.product, quantity: createCartDto.quantity },
        ],
      });
      return cart;
    }

    cart.items = (cart.items || []).filter((item) => item && item.product);

    const existingItem = cart.items.find(
      (item) => item.product.toString() === createCartDto.product.toString(),
    );

    if (existingItem) {
      existingItem.quantity += createCartDto.quantity;
    } else {
      cart.items.push({
        product: createCartDto.product as any,
        quantity: createCartDto.quantity,
      } as any);
    }

    return await cart.save();
  }

  async updateItemQuantity(id: string, quantity: number) {
    const cart = await this.checkUserExistence();
    const item = cart.items.find((item) => item.product.toString() === id);

    if (!item) throw new NotFoundException("Item Not Found in Cart");

    item.quantity = quantity;
    return await cart.save();
  }

  async removeItemFromCart(productId: string) {
    const cart = await this.checkUserExistence();
    const initialLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId,
    );

    if (cart.items.length === initialLength) {
      throw new NotFoundException("Item Not Found");
    }

    return await cart.save();
  }

  async clearCart() {
    const userId = this.request.user?._id;
    if (!userId) throw new UnauthorizedException();

    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) throw new NotFoundException("Cart not found");

    return await cart.deleteOne();
  }

  async getCart() {
    return await this.checkUserExistence();
  }

  private async checkUserExistence() {
    const userId = this.request.user?._id;
    console.log(userId);

    if (!userId) throw new UnauthorizedException("User not authenticated");

    const cart = await this.cartModel.findOne({ user: userId });
    if (!cart) throw new NotFoundException("Cart not found for this user");
    return cart;
  }
}
