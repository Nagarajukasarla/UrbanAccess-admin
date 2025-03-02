import APIResponse from "../../classes/APIResponse";
import API_ROUTES from "../../constants/apiRoutes";
import { LoginResponse } from "../../types/api";
import { LiteAdmin } from "../../types/model";
import BaseService from "./baseService";

class UserService extends BaseService {

    async fetchLiteUser(): Promise<APIResponse<LiteAdmin>> {
        return this.get<LiteAdmin>(API_ROUTES.FETCH_LITE_USER);
    }

    persistUser(response: LoginResponse): void {
        localStorage.setItem("user", JSON.stringify(response));
        localStorage.setItem("token", response.token);
    }

    clearUser(): void {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }
}

export const userService = new UserService();