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

export interface RevenueRequest {
    period: 'monthly' | 'yearly';
}