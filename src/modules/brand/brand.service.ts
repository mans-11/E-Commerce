import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Brand } from "src/DB/models/brand.model";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Injectable()
export class BrandService {
  constructor(
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const brand = await this.brandModel.findOne({ name: createBrandDto.name });
    if (brand) throw new ConflictException("Breand Already Exists");

    const newbrand = await this.brandModel.create(createBrandDto);
    return newbrand;
  }

  async findAll() {
    return await this.brandModel.find();
  }

  async findOne(id: string) {
    return await this.brandModel.findById(id);
  }

  async update(id: string, body: UpdateBrandDto) {
    const brand = await this.brandModel.findById(id);

    if (!brand) throw new NotFoundException("Brand Not Found");

    if (body.name) brand.name = body.name;
    if (body.image) brand.image = body.image;

    await brand.save();
    return brand;
  }

  async remove(id: string) {
    return await this.brandModel.findByIdAndDelete(id);
  }
}
