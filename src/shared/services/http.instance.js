import axios from "axios";
import { authenticationInterceptor } from "@/iam/services/authentication.interceptor.js";

/**
 * Axios instance for API requests
 */
const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

/**
 * Adds authentication token to headers
 */
httpInstance.interceptors.request.use(authenticationInterceptor);

export default httpInstance;
