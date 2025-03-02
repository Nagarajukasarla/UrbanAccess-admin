import { LiteAdmin } from "./model";

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
export interface DashboardStats {
    totalApplications: number;
    acceptedApplications: number;
    rejectedApplications: number;
    monthlyApplications: number;
}


export interface ChartData {
    label: string;
    value: number;
}

export type LoginResponse = LiteAdmin & {
    token: string;
}

export interface RevenueRequest {
    period: 'monthly' | 'yearly';
}
