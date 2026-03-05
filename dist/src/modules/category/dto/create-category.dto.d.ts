import { Types } from "mongoose";
export declare class CreateCategoryDto {
    name: string;
    description?: string;
    createdBy: Types.ObjectId;
    brands: Types.ObjectId[];
}
