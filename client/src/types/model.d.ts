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
    name: string;
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
  updatedBy?: number; // Admin ID
};