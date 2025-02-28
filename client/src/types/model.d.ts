export type LiteAdmin = {
    id: number;
    isOwner: boolean;
    email: string;
    name: string;
    image?: string;
};

export type Admin = {
    id: number;
    isOwner: boolean;
    name: string;
    image?: string;
    email: string;
    mobile?: string;
    divisionId: number;
};

export type Division = {
    id: number;
    code: string;
    name: string;
    area: string;
    place: string;
    city: string;
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

export type PersonalInfo = {
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string = "Male" | "Female" | "Other";
    email?: string;
    gaurdianName?: string;
    gaurdianMobile?: string;
};

export type Address = {
    houseNumber: string;
    addressLine1: string;
    street: string;
    locality: string;
    area: string;
    city: string;
    pincode: string;
};

export type Application = {
    id: number;
    aadhar: string;
    passId?: number;
    mobile: string;
    personalInfo: PersonalInfo;
    address: Address;
    divisionId: number;
    status?: ApplicationStatus;
    updatedBy?: number;
};

export type Application = {
    id: number;

}

export type SchoolStudentApplication = Application & {
    board: string = "SBD" | "CBSC" | "ICSC" | "OTH";
    admissionId: string;
    joiningDate: Date;
    standard: string;
};

export type CollegeStudentApplication = Application & {
    tenthBoard: string = "SBD" | "CBSC" | "ICSC" | "OTH";
    isSupplementary: boolean;
    tenthId: string;
    admissionId?: string;
    rollNumber?: string;
    joiningDate: Date;
    leavingDate?: Date;
    course?: string;
    currentYear?: number;
};

export type Institute = {
    id: number;
    code: string;
    name: string;
    email?: string;
    divisionId: number;
    createdAt: Date;
    isSchool?: boolean;
};
