import { Model } from "mongoose";
import { Brand } from "src/DB/models/brand.model";
import { CreateBrandDto } from "./dto/create-brand.dto";
import { UpdateBrandDto } from "./dto/update-brand.dto";
export declare class BrandService {
    private readonly brandModel;
    constructor(brandModel: Model<Brand>);
    create(createBrandDto: CreateBrandDto): Promise<import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(): Promise<(import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    })[]>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    update(id: string, body: UpdateBrandDto): Promise<import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
    remove(id: string): Promise<(import("mongoose").Document<unknown, {}, Brand, {}, import("mongoose").DefaultSchemaOptions> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }) | null>;
}
