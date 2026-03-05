import { Inject, NotFoundException } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { Document, Model, PopulateOptions } from "mongoose";

export class BaseRepository<T extends Document> {
  constructor(
    private readonly model: Model<T>,
    @Inject(REQUEST) readonly request: any,
  ) {}

  async create(data: Partial<T>): Promise<T> {
    return await this.model.create({
      ...data,
      createdBy: this.request?.user?._id,
    });
  }
  async findAll(populate?: PopulateOptions): Promise<T[]> {
    const query = this.model.find();
    if (populate) query.populate(populate);
    const items = await query;
    if (!items.length) throw new NotFoundException("Items Not Found");
    return items;
  }

  async findOne(id: string, populate?: PopulateOptions): Promise<T> {
    const query = this.model.findById(id);
    if (populate) query.populate(populate);
    const item = await query;
    if (!item) throw new NotFoundException("Item Not Found");
    return item;
  }

  async updateById(
    id: string,
    data: Partial<T>,
    populate?: PopulateOptions,
  ): Promise<T> {
    const query = this.model.findByIdAndUpdate(id, data, { new: true });
    if (populate) query.populate(populate);
    const item = await query;
    if (!item) throw new NotFoundException("Item Not Found");
    return item;
  }

  async deleteById(id: string): Promise<void> {
    const item = await this.model.findByIdAndDelete(id);
    if (!item) throw new NotFoundException("Item Not Found");
  }
}
