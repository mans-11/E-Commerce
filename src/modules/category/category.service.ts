import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Brand } from "src/DB/models/brand.model";
import { Category } from "src/DB/models/category.model";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, image: string) {
    const category = await this.categoryModel.findOne({
      name: createCategoryDto.name,
    });

    if (category) throw new ConflictException("Category Already Exists");

    if (createCategoryDto.brands?.length > 0) {
      const invalidIds = createCategoryDto.brands.find(
        (id) => !Types.ObjectId.isValid(id),
      );

      if (invalidIds)
        throw new BadRequestException(`Invalid Id Format:: ${invalidIds}`);
    }

    const foundBrands = await this.brandModel.find({
      _id: { $in: createCategoryDto.brands },
    });

    if (foundBrands.length !== createCategoryDto.brands?.length)
      throw new BadRequestException("Missing Brands IDS");

    return this.categoryModel.create({
      ...createCategoryDto,
      image,
    });
  }

  async findAll() {
    return await this.categoryModel.find();
  }

  async findOne(id: string) {
    return await this.categoryModel.findById(id);
  }

  async update(id: string, body: UpdateCategoryDto) {
    const category = await this.categoryModel.findById(id);
    if (!category) throw new NotFoundException("Category Not Fopund");
    if (body.name) category.name = body.name;
    if (body.image) category.image = body.image;
    await category.save();
    return category;
  }

  async remove(id: string) {
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
