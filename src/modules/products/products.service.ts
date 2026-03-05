import {
  ConflictException,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Category } from "src/DB/models/category.model";
import { Product } from "src/DB/models/products.model";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @Inject(REQUEST) private readonly request,
  ) {}

  async create(createProductDto: CreateProductDto, images: string[]) {
    if (!Types.ObjectId.isValid(createProductDto.category)) {
      throw new NotAcceptableException("Invalid Category Id");
    }

    if (!Types.ObjectId.isValid(createProductDto.createdBy)) {
      throw new NotAcceptableException("Invalid User Id");
    }
    const category = await this.categoryModel.findById(
      createProductDto.category,
    );
    if (!category) {
      throw new NotAcceptableException("Category Not Found");
    }
    const product = await this.productModel.findOne({
      name: createProductDto.name,
    });
    if (product) throw new ConflictException("Product Already Exists");
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

  async findOne(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotAcceptableException("Invalid Product Id");
    }

    const product = await this.productModel
      .findById(id)
      .populate("category")
      .populate("createdBy");

    if (!product) {
      throw new NotFoundException("Product Not Found");
    }

    return product;
  }

  async update(id: string, body: UpdateProductDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotAcceptableException("Invalid Product Id");
    }

    const product = await this.productModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!product) {
      throw new NotFoundException("Product Not Found");
    }
    return product;
  }

  async remove(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotAcceptableException("Invalid Product Id");
    }

    const product = await this.productModel.findByIdAndDelete(id);

    if (!product) {
      throw new NotFoundException("Product Not Found");
    }

    return { message: "Product Deleted Successfully" };
  }
}
