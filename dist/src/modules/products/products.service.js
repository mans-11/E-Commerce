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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_model_1 = require("../../DB/models/category.model");
const products_model_1 = require("../../DB/models/products.model");
let ProductsService = class ProductsService {
    productModel;
    categoryModel;
    request;
    constructor(productModel, categoryModel, request) {
        this.productModel = productModel;
        this.categoryModel = categoryModel;
        this.request = request;
    }
    async create(createProductDto, images) {
        if (!mongoose_2.Types.ObjectId.isValid(createProductDto.category)) {
            throw new common_1.NotAcceptableException("Invalid Category Id");
        }
        if (!mongoose_2.Types.ObjectId.isValid(createProductDto.createdBy)) {
            throw new common_1.NotAcceptableException("Invalid User Id");
        }
        const category = await this.categoryModel.findById(createProductDto.category);
        if (!category) {
            throw new common_1.NotAcceptableException("Category Not Found");
        }
        const product = await this.productModel.findOne({
            name: createProductDto.name,
        });
        if (product)
            throw new common_1.ConflictException("Product Already Exists");
        const newProduct = await this.productModel.create({
            ...createProductDto,
            images,
        });
        return newProduct;
    }
    async findAll() {
        return await this.productModel
            .find()
            .populate("category")
            .populate("createdBy");
    }
    async findOne(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotAcceptableException("Invalid Product Id");
        }
        const product = await this.productModel
            .findById(id)
            .populate("category")
            .populate("createdBy");
        if (!product) {
            throw new common_1.NotFoundException("Product Not Found");
        }
        return product;
    }
    async update(id, body) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotAcceptableException("Invalid Product Id");
        }
        const product = await this.productModel.findByIdAndUpdate(id, body, {
            new: true,
        });
        if (!product) {
            throw new common_1.NotFoundException("Product Not Found");
        }
        return product;
    }
    async remove(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new common_1.NotAcceptableException("Invalid Product Id");
        }
        const product = await this.productModel.findByIdAndDelete(id);
        if (!product) {
            throw new common_1.NotFoundException("Product Not Found");
        }
        return { message: "Product Deleted Successfully" };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(products_model_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_model_1.Category.name)),
    __param(2, (0, common_1.Inject)(core_1.REQUEST)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model, Object])
], ProductsService);
//# sourceMappingURL=products.service.js.map