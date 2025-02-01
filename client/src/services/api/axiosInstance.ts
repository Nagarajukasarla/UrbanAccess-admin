import axios from "axios";

const API_URL: string =  "http://localhost:8080/api/v1";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// Enable cookies to be sent with the request
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            console.log("Unauthorized, Redirecting...");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;