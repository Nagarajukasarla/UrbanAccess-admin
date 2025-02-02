export type Owner = {
    id: number;
    name: string;
    image?: string;
};

export type LiteAdmin = {
    id: number;
    ownerId: number;
    email: string;
    name: string;
    image?: string;
};

export type Admin = {
    id: number;
    name: string;
    ownerId: number;
    image?: string;
    email: string;
    mobile?: string;
    divisionId: number;
};

export type Division = {
    id: number;
    code: string;
    name: string;
    numberOfCollege?: number;
    numberOfSchools?: number;
};

export type PassType = "Basic" | "Silver" | "Gold" | "Platinum";

export type PassStatus = "Active" | "Inactive";

// export type ApplicationStatus = "Pending" | "Approved" | "Rejected";

export type Pass = {
    id: number;
    applicantId: number;
    divisionId: number;
    type: PassType;
    price: number;
    status: PassStatus;
    createdAt: Date;
    approvedAt?: Date;
    revokedAt?: Date;
    updatedAt: Date;
    updatedBy: number;
};

export type ApplicationStatus = "Pending" | "Approved" | "Rejected";

export type Application = {
    id: number;
    name: string;
    email: string;
    mobile?: string;
    divisionId: number;
    passId?: number;
    status?: ApplicationStatus;
    updatedBy?: number;
};

export type Institute = {
    id: number;
    code: string;
    name: string;
    divisionId: number;
    createdAt: Date;
    isSchool?: boolean;
};
