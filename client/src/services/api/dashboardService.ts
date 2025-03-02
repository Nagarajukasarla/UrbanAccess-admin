import APIResponse from "../../classes/APIResponse";
import API_ROUTES from "../../constants/apiRoutes";
import { DashboardStats, ChartData, RevenueRequest } from "../../types/api";
import BaseService from "./baseService";

class DashboardService extends BaseService {
    async getDashboardStats(): Promise<APIResponse<DashboardStats>> {
        return this.get<DashboardStats>(API_ROUTES.DASHBOARD_STATS);
    }

    async getPassTypeAnalytics(): Promise<APIResponse<ChartData[]>> {
        return this.get<ChartData[]>(API_ROUTES.DASHBOARD_PASS_ANALYTICS);
    }

    async getDivisionAnalytics(): Promise<APIResponse<ChartData[]>> {
        return this.get<ChartData[]>(API_ROUTES.DASHBOARD_DIVISION_ANALYTICS);
    }

    async getRevenueAnalytics(payload: RevenueRequest): Promise<APIResponse<ChartData[]>> {
        return this.post<ChartData[]>(API_ROUTES.DASHBOARD_REVENUE, payload);
    }
}

export const dashboardService = new DashboardService();