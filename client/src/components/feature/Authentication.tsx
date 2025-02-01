import { useEffect, useState } from "react";
import Spinner from "../../components/common/Spinner";
import { authService } from "../../services/api/authService";

export const Authentication = () => {
    const [isLoading, setIsLoading] = useState(false);

    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        handleAuthenticate();
    }, []);

    const handleAuthenticate: () => Promise<void> = async () => {
        setIsLoading(true);
        try {
            const response = await authService.authenticate();
            console.log(`Authentication response: ${response}`);
        } catch (error) {
            console.error("Error authenticating:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Spinner />}
            {!isLoading && <h1>Authenticated</h1>}
        </>
    );
};

export default Authentication;
