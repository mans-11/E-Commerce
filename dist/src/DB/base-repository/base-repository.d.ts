import { Document, Model, PopulateOptions } from "mongoose";
export declare class BaseRepository<T extends Document> {
    private readonly model;
    readonly request: any;
    constructor(model: Model<T>, request: any);
    create(data: Partial<T>): Promise<T>;
    findAll(populate?: PopulateOptions): Promise<T[]>;
    findOne(id: string, populate?: PopulateOptions): Promise<T>;
    updateById(id: string, data: Partial<T>, populate?: PopulateOptions): Promise<T>;
    deleteById(id: string): Promise<void>;
}
