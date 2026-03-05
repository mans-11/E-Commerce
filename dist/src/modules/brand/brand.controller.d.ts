import { Types } from "mongoose";
import { BrandService } from "./brand.service";
import { UpdateBrandDto } from "./dto/update-brand.dto";
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    create(name: string, createdBy: Types.ObjectId, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/brand.model").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/brand.model").Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("../../DB/models/brand.model").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/brand.model").Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../DB/models/brand.model").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/brand.model").Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, body: UpdateBrandDto, file: Express.Multer.File): Promise<import("mongoose").Document<unknown, {}, import("../../DB/models/brand.model").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/brand.model").Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, import("../../DB/models/brand.model").Brand, {}, import("mongoose").DefaultSchemaOptions> & import("../../DB/models/brand.model").Brand & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
