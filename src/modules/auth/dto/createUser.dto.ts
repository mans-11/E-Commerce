import { GenderEnum, ProviderEnum } from "src/common/enums/user.enum";
import z from "zod";

export class SignupDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  gender?: string;
  provider: string;
}
export type ISignUpDTO = z.infer<typeof SignupDto>;

export const signupUserSchema = z
  .strictObject({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.email(),
    password: z.string(),
    confirmPassword: z.string().optional(),
    gender: z.enum(GenderEnum).optional(),
    provider: z.enum(ProviderEnum).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password and confirmpassword dont match",
    path: ["confirmpassword"],
  });
