import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

export const getUserFromCookie = () => {
    const token = Cookies.get("authToken"); // Read cookie
    if (!token) return null;

    try {
        return jwtDecode(token); // Decode user data
    } catch (error) {
        return null;
    }
};
