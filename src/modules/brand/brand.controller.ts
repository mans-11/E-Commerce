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
import { Types } from "mongoose";
import { UploadImage } from "src/common/interceptor/multer/cloud.multer";
import { BrandService } from "./brand.service";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";

@Controller("brand")
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @UploadImage({
    fieldName: "image",
    destination: "./src/uploads/brand",
  })
  create(
    @Body("name", new ValidationPipe()) name: string,
    @Body("createdBy", new ValidationPipe()) createdBy: Types.ObjectId,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const CreateBrandDto: CreateBrandDto = {
      name,
      createdBy,
      image: file.filename,
    };
    return this.brandService.create(CreateBrandDto);
  }

  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(":id")
  @UploadImage({
    fieldName: "image",
    destination: "./src/uploads/brand",
  })
  update(
    @Param("id") id: string,
    @Body() body: UpdateBrandDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) body.image = `./src/uploads/brand ${file.fieldname}`;
    return this.brandService.update(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.brandService.remove(id);
  }
}
