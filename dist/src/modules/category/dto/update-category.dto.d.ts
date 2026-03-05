import { Types } from "mongoose";
export declare class UpdateCategoryDto {
    name: string;
    description?: string;
    image: string;
    createdBy: Types.ObjectId;
    brands: Types.ObjectId[];
}
