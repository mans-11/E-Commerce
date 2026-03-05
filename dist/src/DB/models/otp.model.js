"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = exports.OtpSchema = exports.Otp = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importStar(require("mongoose"));
const user_enum_1 = require("../../common/enums/user.enum");
const email_events_1 = require("../../common/utils/events/email.events");
const hash_1 = require("../../common/utils/hashing/hash");
const user_model_1 = require("./user.model");
let Otp = class Otp {
    code;
    expiredAt;
    createdBy;
    type;
};
exports.Otp = Otp;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        required: true,
    }),
    __metadata("design:type", String)
], Otp.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        required: true,
    }),
    __metadata("design:type", Date)
], Otp.prototype, "expiredAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Types.ObjectId,
        required: true,
        ref: user_model_1.User.name,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Otp.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: user_enum_1.OTPEnum,
        required: true,
    }),
    __metadata("design:type", String)
], Otp.prototype, "type", void 0);
exports.Otp = Otp = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    })
], Otp);
exports.OtpSchema = mongoose_1.SchemaFactory.createForClass(Otp);
exports.OtpSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });
exports.OtpSchema.pre("save", async function () {
    this.wasNew = this.isNew;
    if (this.isModified("code")) {
        this.plainOtp = this.code;
        this.code = await (0, hash_1.hash)(this.code);
        await this.populate("createdBy");
    }
});
exports.OtpSchema.post("save", async function (doc, next) {
    const that = this;
    if (that.wasNew && that.plainOtp) {
        email_events_1.emailEvent.emit("confirm-email", {
            to: that.createdBy.email,
            otp: that.plainOtp,
            username: that.createdBy.firstName,
        });
    }
});
exports.OtpModel = mongoose_1.MongooseModule.forFeature([
    {
        name: Otp.name,
        schema: exports.OtpSchema,
    },
]);
//# sourceMappingURL=otp.model.js.map