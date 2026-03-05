export interface SignupInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword?: string;
    gender?: string;
    provider?: string;
}
