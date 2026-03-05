import { Types } from "mongoose";
export declare class CreateBrandDto {
    name: string;
    image: string;
    createdBy: Types.ObjectId;
}
