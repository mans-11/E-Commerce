import { MongoIdDto } from "src/common/pipes/object-id-validation.pipe";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsService } from "./products.service";
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, files: Express.Multer.File[]): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/products.model").Product, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/products.model").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../../DB/models/products.model").Product, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/products.model").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(params: MongoIdDto): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/products.model").Product, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/products.model").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    update(params: MongoIdDto, updateProductDto: UpdateProductDto): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/products.model").Product, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/products.model").Product & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(params: MongoIdDto): Promise<void>;
}
