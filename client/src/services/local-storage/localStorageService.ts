import { applications } from "../../data/components";
import { DashboardStats } from "../../types/local-data";
import { Application } from "../../types/model";

export const persistApplicationsToLocalStorage = () => {
    const applicationsJson = JSON.stringify(applications);
    localStorage.setItem("applications", applicationsJson);
};

export const getPendingApplicationsFromLocalStorage = (): Application[] => {
    const allApplicationsJson = localStorage.getItem("applications");
    const allApplications = JSON.parse(allApplicationsJson!);
    return allApplications.filter((application: Application) => application.status === "Pending");
};

export const getNonPendingApplicationsFromLocalStorage = (): Application[] => {
    const allApplicationsJson = localStorage.getItem("applications");
    const allApplications = JSON.parse(allApplicationsJson!);
    return allApplications.filter((application: Application) => application.status !== "Pending");
};

export const updateApplicationStatusInLocalStorage = (applicationId: number, newStatus: string) => {
    const allApplicationsJson = localStorage.getItem("applications");
    const allApplications = JSON.parse(allApplicationsJson!);
    const updatedApplications = allApplications.map((application: Application) => {
        if (application.id === applicationId) {
            return { ...application, status: newStatus };
        }
        return application;
    });
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
};

export const getApplicationStatisticsFromLocalStorage = (): DashboardStats => {
    const allApplicationsJson = localStorage.getItem("applications");
    const allApplications = JSON.parse(allApplicationsJson!);
    const approvedApplications = allApplications.filter((application: Application) => application.status === "Approved").length;
    const rejectedApplications = allApplications.filter((application: Application) => application.status === "Rejected").length;

    return {
        totalApplications: allApplications.length,
        approvedApplications,
        rejectedApplications,
        monthlyRevenue: approvedApplications * 550,
    };
};