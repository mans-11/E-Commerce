import { GenderEnum, ProviderEnum } from "src/common/enums/user.enum";
import z from "zod";
export declare class SignupDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    gender?: string;
    provider: string;
}
export type ISignUpDTO = z.infer<typeof SignupDto>;
export declare const signupUserSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    confirmPassword: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<typeof GenderEnum>>;
    provider: z.ZodOptional<z.ZodEnum<typeof ProviderEnum>>;
}, z.core.$strict>;
