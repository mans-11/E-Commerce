"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupUserSchema = exports.SignupDto = void 0;
const user_enum_1 = require("../../../common/enums/user.enum");
const zod_1 = __importDefault(require("zod"));
class SignupDto {
    firstName;
    lastName;
    email;
    password;
    confirmPassword;
    gender;
    provider;
}
exports.SignupDto = SignupDto;
exports.signupUserSchema = zod_1.default
    .strictObject({
    firstName: zod_1.default.string().min(2).max(50),
    lastName: zod_1.default.string().min(2).max(50),
    email: zod_1.default.email(),
    password: zod_1.default.string(),
    confirmPassword: zod_1.default.string().optional(),
    gender: zod_1.default.enum(user_enum_1.GenderEnum).optional(),
    provider: zod_1.default.enum(user_enum_1.ProviderEnum).optional(),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "password and confirmpassword dont match",
    path: ["confirmpassword"],
});
//# sourceMappingURL=createUser.dto.js.map