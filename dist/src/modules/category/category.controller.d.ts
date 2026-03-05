import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/category.model").Category, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/category.model").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../../DB/models/category.model").Category, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/category.model").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../DB/models/category.model").Category, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/category.model").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, body: UpdateCategoryDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/category.model").Category, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/category.model").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../DB/models/category.model").Category, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/category.model").Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
