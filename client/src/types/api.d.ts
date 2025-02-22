export type LiteUserRequest = {
    email: string;
    password?: string;
    otp?: string;
};

export type SignupRequest = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

