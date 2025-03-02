import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APIResponse from "../classes/APIResponse";
import Spinner from "../components/common/Spinner";
import { authService } from "../services/api/authService";

type RouteGuardProps = {
    children: React.ReactNode;
    isAuthPage?: boolean;
};

const RouteGuard: React.FC<RouteGuardProps> = ({
    children,
    isAuthPage = false,
}) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const user = localStorage.getItem("user");
            console.log("User: ", user);

            if (!user) {
                if (!isAuthPage) {
                    navigate("/login", { replace: true });
                }
                setIsLoading(false);
                return;
            }

            try {
                const response: APIResponse<string> =
                    await authService.authenticate();
                const authenticated = response.code === APIResponse.SUCCESS;
                setIsAuthenticated(authenticated);

                if (authenticated && isAuthPage) {
                    navigate("/", { replace: true });
                } else if (!authenticated && !isAuthPage) {
                    navigate("/login", { replace: true });
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                if (!isAuthPage) {
                    navigate("/login", { replace: true });
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [navigate, isAuthPage]); // Need to understand why we are using navigate & isAuthPage using here

    if (isLoading) {
        return <Spinner />;
    }

    //Only render children if authenticated or it's an auth page
    if (!isAuthPage && !isAuthenticated) {
        return null;
    }

    return <>{children}</>;
};

export default RouteGuard;
