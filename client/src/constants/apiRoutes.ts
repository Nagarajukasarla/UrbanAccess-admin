const API_ROUTES = {
    AUTHENTICATE: "/authenticate",
    LOGIN: "/auth/sign-in",
    REGISTER: "/auth/register",
    VERIFY_OTP: "/auth/verify-otp",
    LOGOUT: "/auth/logout",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    FETCH_LITE_USER: "/lite-shop",
    FETCH_USER: "/shop/:shopId",    // Verify the syntax
    UPDATE_USER: "/shop/:shopId/update",   // Verify the syntax
    FETCH_DASHBOARD: "/dashboard-stats",
    FETCH_CUSTOMERS: "/customers",
    FETCH_STOCKS: "/stocks",
    DASHBOARD_STATS: "/dashboard/stats",
    DASHBOARD_PASS_ANALYTICS: "/dashboard/pass-analytics",
    DASHBOARD_DIVISION_ANALYTICS: "/dashboard/division-analytics",
    DASHBOARD_REVENUE: "/dashboard/revenue",
};

export default API_ROUTES;