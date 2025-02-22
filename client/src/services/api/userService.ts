import APIResponse from "../../classes/APIResponse";
import API_ROUTES from "../../constants/apiRoutes";
import { LiteAdmin } from "../../types/model";
import BaseService from "./baseService";

class UserService extends BaseService {

    async fetchLiteUser(): Promise<APIResponse<LiteAdmin>> {
        return this.get<LiteAdmin>(API_ROUTES.FETCH_LITE_USER);
    }

    persistUser(user: LiteAdmin): void {
        localStorage.setItem("user", JSON.stringify(user));
    }

    clearUser(): void {
        localStorage.removeItem("user");
    }
}

export const userService = new UserService();