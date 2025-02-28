import APIResponse from "../../classes/APIResponse";
import API_ROUTES from "../../constants/apiRoutes";
import { LoginRequest, SignupRequest } from "../../types/api";
import { LiteAdmin } from "../../types/model";
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
     * @param payload The user's email address and password.
     * @returns A promise that resolves to an `APIResponse` containing a `LiteAdmin` object.
     */
    async loginWithPassword(payload: LoginRequest): Promise<APIResponse<LiteAdmin>> {
        return this.post<LiteAdmin>(API_ROUTES.LOGIN, payload);
    }

    // Create signup api
    // it should send a email to user
    async signup(payload: SignupRequest): Promise<APIResponse<boolean>> {
        return this.post<boolean>(API_ROUTES.REGISTER, payload);
    }

    // Create otp verification api
    // it should verify the otp and return the user details
    // redirect to login

    async verifyOtp(email: string, otp: string): Promise<APIResponse<LiteAdmin>> {
        return this.post<LiteAdmin>(API_ROUTES.VERIFY_OTP, { email, otp });
    }

    // Create login api
    // login with email and password
    // Update local storage with user details
    // redirect to dashboard
    async login(payload: LoginRequest): Promise<APIResponse<LiteAdmin>> {
        return this.post<LiteAdmin>(API_ROUTES.LOGIN, payload);
    }

    // Create logout api
    // remove user details from local storage
    // redirect to login

    async logout(): Promise<APIResponse<boolean>> {
        // Clear local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return new APIResponse(APIResponse.SUCCESS, true);
    }

    // Create forgot password api
    // it should send otp to user email
    // redirect to otp verification
    // validate otp
    // in the same page only take new password & confirm password
    // redirect to login

    async forgotPassword(email: string): Promise<APIResponse<boolean>> {
        return this.post<boolean>(API_ROUTES.FORGOT_PASSWORD, { email });
    }

    async resetPassword(payload: { otp: string, password: string }): Promise<APIResponse<boolean>> {
        return this.post<boolean>(API_ROUTES.RESET_PASSWORD, payload);
    }

}

export const authService = new AuthService();