import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IProduct } from "lib/product/product.interface";
import mongoose, { HydratedDocument, Types } from "mongoose";
import slugify from "slugify";
import { Category } from "./category.model";
import { User } from "./user.model";

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product implements IProduct {
  @Prop({
    type: String,
    unique: true,
    required: true,
    minlength: 3,
    maxLength: 100,
  })
  name: string;

  @Prop({
    type: String,
    minlength: 3,
    maxLength: 100,
  })
  slug: string;

  @Prop({
    type: String,
    minlength: 3,
    maxLength: 5000,
  })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: User.name,
  })
  createdBy: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  images: string[];
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Category.name,
  })
  category: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export type HProductDocument = HydratedDocument<Product>;

ProductSchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true });
  }
});

export const ProductModel = MongooseModule.forFeature([
  {
    name: Product.name,
    schema: ProductSchema,
  },
]);
