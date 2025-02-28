export type LiteUserRequest = {
    email: string;
    password?: string;
    otp?: string;
};

export type SignupRequest = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
};

export type LoginRequest = {
    email: string;
    password: string;
};

