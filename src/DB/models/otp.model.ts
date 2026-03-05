import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { OTPEnum } from "src/common/enums/user.enum";
import { emailEvent } from "src/common/utils/events/email.events";
import { hash } from "src/common/utils/hashing/hash";
import { User } from "./user.model";

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Otp {
  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  code: string;
  @Prop({
    type: Date,
    required: true,
  })
  expiredAt: Date;
  @Prop({
    type: mongoose.Types.ObjectId,
    required: true,
    ref: User.name,
  })
  createdBy: Types.ObjectId;
  @Prop({
    type: String,
    enum: OTPEnum,
    required: true,
  })
  type: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
OtpSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });

OtpSchema.pre(
  "save",
  async function (this: HOtpDocument & { wasNew: boolean; plainOtp?: string }) {
    this.wasNew = this.isNew;
    if (this.isModified("code")) {
      this.plainOtp = this.code;
      this.code = await hash(this.code);
      await this.populate("createdBy");
    }
  },
);

OtpSchema.post("save", async function (doc, next) {
  const that = this as HOtpDocument & { wasNew?: boolean; plainOtp?: string };
  if (that.wasNew && that.plainOtp) {
    emailEvent.emit("confirm-email", {
      to: (that.createdBy as any).email,
      otp: that.plainOtp,
      username: (that.createdBy as any).firstName,
    });
  }
});

export type HOtpDocument = HydratedDocument<Otp>;
export const OtpModel = MongooseModule.forFeature([
  {
    name: Otp.name,
    schema: OtpSchema,
  },
]);
