import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    //ToggleSidebar
    // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth <= 768);
    

    const navigate = useNavigate();

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem("token", serverToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        navigate('/'); // Redirect to homepage
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem("token");
    };

    //ToggleSidebar
     const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
     };


    return (
        <AuthContext.Provider value={{ storeTokenInLS, logout, isAuthenticated , isSidebarOpen, toggleSidebar ,setIsSidebarOpen}}>
         {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth is outside of the Provider");
    }
    return authContextValue;
};
