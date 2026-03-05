"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_model_1 = require("../../DB/models/cart.model");
const products_model_1 = require("../../DB/models/products.model");
let CartService = class CartService {
    productModel;
    cartModel;
    request;
    constructor(productModel, cartModel, request) {
        this.productModel = productModel;
        this.cartModel = cartModel;
        this.request = request;
    }
    async addItemToCart(createCartDto) {
        const userId = this.request.user?._id;
        if (!userId)
            throw new common_1.UnauthorizedException("User not authenticated");
        const product = await this.productModel.findById(createCartDto.product);
        if (!product)
            throw new common_1.BadRequestException("Product not found");
        if (createCartDto.quantity > product.stock) {
            throw new common_1.BadRequestException("Stock Is Not Enough");
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
        const existingItem = cart.items.find((item) => item.product.toString() === createCartDto.product.toString());
        if (existingItem) {
            existingItem.quantity += createCartDto.quantity;
        }
        else {
            cart.items.push({
                product: createCartDto.product,
                quantity: createCartDto.quantity,
            });
        }
        return await cart.save();
    }
    async updateItemQuantity(id, quantity) {
        const cart = await this.checkUserExistence();
        const item = cart.items.find((item) => item.product.toString() === id);
        if (!item)
            throw new common_1.NotFoundException("Item Not Found in Cart");
        item.quantity = quantity;
        return await cart.save();
    }
    async removeItemFromCart(productId) {
        const cart = await this.checkUserExistence();
        const initialLength = cart.items.length;
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);
        if (cart.items.length === initialLength) {
            throw new common_1.NotFoundException("Item Not Found");
        }
        return await cart.save();
    }
    async clearCart() {
        const userId = this.request.user?._id;
        if (!userId)
            throw new common_1.UnauthorizedException();
        const cart = await this.cartModel.findOne({ user: userId });
        if (!cart)
            throw new common_1.NotFoundException("Cart not found");
        return await cart.deleteOne();
    }
    async getCart() {
        return await this.checkUserExistence();
    }
    async checkUserExistence() {
        const userId = this.request.user?._id;
        console.log(userId);
        if (!userId)
            throw new common_1.UnauthorizedException("User not authenticated");
        const cart = await this.cartModel.findOne({ user: userId });
        if (!cart)
            throw new common_1.NotFoundException("Cart not found for this user");
        return cart;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_model_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(cart_model_1.Cart.name)),
    __param(2, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model, Object])
], CartService);
//# sourceMappingURL=cart.service.js.map