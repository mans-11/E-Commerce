import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  ValidationPipe,
} from "@nestjs/common";
import { UploadImage } from "src/common/interceptor/multer/cloud.multer";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UploadImage({ fieldName: "image", destination: "./src/uploads/categories" })
  create(
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const imagePath = file.path;
    return this.categoryService.create(createCategoryDto, imagePath);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(":id")
  @UploadImage({ fieldName: "image", destination: "./src/uploads/categories" })
  update(
    @Param("id") id: string,
    @Body() body: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) body.image = `./src/uploads/categories ${file.fieldname}`;
    return this.categoryService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.remove(id);
  }
}
