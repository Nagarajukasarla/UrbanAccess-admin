import { useEffect, useState } from "react";
import { LiteUser } from "../types/model";
import { userService } from "../services/api/userService";
import APIResponse from "../classes/APIResponse";

const useUserState = () => {
    const [liteUser, setLiteUser] = useState<LiteUser | null>(null);

    // Here need to make sure that even if user is present in local storage,
    // You need to call API for token validation which is in http-only cookies
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setLiteUser(JSON.parse(storedUser));
        } else {
            fetchUser();
        }
    }, []);

    const fetchUser = async () => {
        // Fetch user from API using APIResponse wrapper class
        const user = await userService.fetchLiteUser();
        if (user.code === APIResponse.SUCCESS && user.data) {
            persistLiteUser(user.data);
        }
    };

    // Need to handle this error properly
    // First decided who and when user can update the user details
    const updateLiteUser = async (user: Partial<LiteUser>) => {
        // persistLiteUser(updatedUser);
    };

    const persistLiteUser = (user: LiteUser) => {
        setLiteUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const clearLiteUser = () => {
        setLiteUser(null);
        localStorage.removeItem("user");
    };

    // const verifyToken = ()

    return {
        liteUser,
        fetchUser,
        updateLiteUser,
        clearLiteUser,
        persistLiteUser,
    };
};

export default useUserState;
