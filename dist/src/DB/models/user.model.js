"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const user_enum_1 = require("../../common/enums/user.enum");
const hash_1 = require("../../common/utils/hashing/hash");
let User = class User {
    firstName;
    lastName;
    userName;
    email;
    password;
    confirmEmail;
    gender;
    provider;
    otp;
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        min: 2,
        max: 50,
        trim: true,
    }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        min: 2,
        max: 50,
        trim: true,
    }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Virtual)({
        get: function () {
            return this.firstName + " " + this.lastName;
        },
        set: function (value) {
            const [firstName, lastName] = value.split(" ") || [];
            this.set({ firstName, lastName });
        },
    }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    __metadata("design:type", Date)
], User.prototype, "confirmEmail", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
    }),
    (0, mongoose_1.Prop)({
        type: String,
        enum: {
            values: Object.values(user_enum_1.GenderEnum),
            message: "{VALUE}is not a valid gender",
        },
        default: user_enum_1.GenderEnum.MALE,
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: {
            values: Object.values(user_enum_1.ProviderEnum),
            message: "{VALUE}is not a valid Provider",
        },
        default: user_enum_1.ProviderEnum.SYSTEM,
    }),
    __metadata("design:type", String)
], User.prototype, "provider", void 0);
__decorate([
    (0, mongoose_1.Virtual)(),
    __metadata("design:type", Array)
], User.prototype, "otp", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.virtual("otp", {
    localField: "_id",
    foreignField: "createdBy",
    ref: "Otp",
});
exports.UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await (0, hash_1.hash)(this.password);
    }
});
exports.UserModel = mongoose_1.MongooseModule.forFeature([
    {
        name: User.name,
        schema: exports.UserSchema,
    },
]);
//# sourceMappingURL=user.model.js.map