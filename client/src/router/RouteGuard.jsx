import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/common/Spinner";


const RouteGuard = ({
    children,
    isAuthPage = false,
}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const shop = localStorage.getItem("shop");
            console.log("Shop: ", shop);

            // if (!shop) {
            //     if (!isAuthPage) {
            //         navigate("/login", { replace: true });
            //     }
            //     setIsLoading(false);
            //     return;
            // }

            // try {
            //     const response: APIResponse<string> = await authenticate();
            //     if (response.code === APIResponse.SUCCESS) {
            //         setIsAuthenticated(true);
            //     } else {
            //         setIsAuthenticated(false);
            //     }

            //     if (isAuthenticated && isAuthPage) {
            //         navigate("/dashboard", { replace: true });
            //     } else if (!isAuthenticated && !isAuthPage) {
            //         navigate("/login", { replace: true });
            //     }
            // } catch (error) {
            //     console.error("Auth check failed:", error);
            //     if (!isAuthPage) {
            //         navigate("/login", { replace: true });
            //     }
            // } finally {
            //     setIsLoading(false);
            // }
        };

        checkAuth();
    }, [navigate, isAuthPage]);  // Need to understand why we are using navigate & isAuthPage using here

    if (isLoading) {
        return <Spinner />;
    }

    // Only render children if authenticated or it's an auth page
    // if (!isAuthPage && !isAuthenticated) {
    //     return null;
    // }

    return <>{children}</>;
};

export default RouteGuard;
