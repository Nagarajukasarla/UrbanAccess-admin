import APIResponse from "../../classes/APIResponse";
import API_ROUTES from "../../constants/apiRoutes";
import { LiteUser } from "../../types/model";
import BaseService from "./baseService";

class AuthService extends BaseService {
    /**
     * Authenticates the user.
     * @returns A promise that resolves to an `APIResponse` containing a string.
     */
    async authenticate(): Promise<APIResponse<string>> {
        return this.get<string>(API_ROUTES.AUTHENTICATE);
    }

    /**
     * Logs in a user with email and password.
     * @param email The user's email address.
     * @param password The user's password.
     * @returns A promise that resolves to an `APIResponse` containing a `LiteUser` object.
     */
    async loginWithPassword(email: string, password: string): Promise<APIResponse<LiteUser>> {
        return this.post<LiteUser>(API_ROUTES.LOGIN, { email, password });
    }

    /**
     * Logs in a user with email and OTP.
     * @param email The user's email address.
     * @param otp The one-time password.
     * @returns A promise that resolves to an `APIResponse` containing a `LiteUser` object.
     */
    async loginWithOTP(email: string, otp: string): Promise<APIResponse<LiteUser>> {
        return this.post<LiteUser>(API_ROUTES.LOGIN, { email, otp });
    }

}

export const authService = new AuthService();