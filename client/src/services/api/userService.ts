import APIResponse from "../../classes/APIResponse";
import API_ROUTES from "../../constants/apiRoutes";
import { LiteUser } from "../../types/model";
import BaseService from "./baseService";

class UserService extends BaseService {

    async fetchLiteUser(): Promise<APIResponse<LiteUser>> {
        return this.get<LiteUser>(API_ROUTES.FETCH_LITE_USER);
    }
}

export const userService = new UserService();