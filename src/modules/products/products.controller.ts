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
  UploadedFiles,
  ValidationPipe,
} from "@nestjs/common";
import { UploadImages } from "src/common/interceptor/multer/cloud.multer";
import { MongoIdDto } from "src/common/pipes/object-id-validation.pipe";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./products.service";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UploadImages({
    fieldName: "images",
    destination: "./src/uploads/products",
    maxCount: 5,
  })
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const images = files?.map((file) => file.path) || [];

    return this.productsService.create(createProductDto, images);
  }
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  findOne(@Param(new ValidationPipe({ transform: true })) params: MongoIdDto) {
    return this.productsService.findOne(params.id);
  }
  @Patch(":id")
  update(
    @Param(new ValidationPipe({ transform: true })) params: MongoIdDto,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(params.id, updateProductDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param(new ValidationPipe({ transform: true })) params: MongoIdDto,
  ): Promise<void> {
    await this.productsService.remove(params.id);
  }
}
