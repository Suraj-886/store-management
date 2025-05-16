import { useEffect, useState } from "react"
import { AdminContext } from "./AdminContext"
import { authUser } from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminProvider = ( {children} ) => {
    const [adminDetail, setAdminDetail] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();  // ✅ Get current route

    const fetchAdminDetail = async () => {
        try {
            let authToken = localStorage.getItem("authToken");

            if (!authToken) {
                // ✅ Prevent redirect loop if already on login/register
                if (location.pathname !== "/login" && location.pathname !== "/register" && location.pathname !=="/forget") {
                    navigate("/login");
                }
                return;
            }

            let response = await authUser(authToken);
            setAdminDetail({
                authToken: authToken,
                userName: response.data.data.userName,
                email: response.data.data.email,
                storeName: response.data.data.storeName,
            });
        } catch (error) {
            console.error("Auth error:", error);
            localStorage.removeItem("authToken");
            navigate("/login");
        }
    };
    useEffect(() => {

        fetchAdminDetail();
    }, [location.pathname]);  // ✅ Runs when the URL changes

    
    return (
        <AdminContext.Provider value={{ adminDetail, setAdminDetail}}>
            {children}
        </AdminContext.Provider>
    )
}