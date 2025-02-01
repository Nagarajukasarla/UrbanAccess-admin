const API_ROUTES = {
    AUTHENTICATE: "/authenticate",
    LOGIN: "/auth/sign-in",
    REGISTER: "/auth/register",
    FETCH_LITE_USER: "/lite-shop",
    FETCH_USER: "/shop/:shopId",    // Verify the syntax
    UPDATE_USER: "/shop/:shopId/update",   // Verify the syntax
    FETCH_DASHBOARD: "/dashboard-stats",
    FETCH_CUSTOMERS: "/customers",
    FETCH_STOCKS: "/stocks",
};

export default API_ROUTES;