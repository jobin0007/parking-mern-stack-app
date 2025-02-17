import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useLogout = (setUser) => {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["logout"],
        mutationFn: async () => {
            // Clear the auth token cookie
            document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        },
        onSuccess: () => {
            setUser(null);  // Immediately update UI
            navigate("/");  // Redirect to home
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    });
};

export default useLogout;
