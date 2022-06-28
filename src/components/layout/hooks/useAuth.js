import {useEffect, useState} from "react";
import {isLoggedIn, login, logout,signup} from "../../../helpers/authService";


export default () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        setIsAuthenticated(isLoggedIn());
    }, []);

    const handleLogin = async (username, password) => {
        const userDetails = await login(username, password);
        setIsAuthenticated(true);
        return userDetails;
    };

    const handleSignUp=async(name,username,email,mobileNumber, password,confirmPassword)=>{
        const customerDetails=await signup(name,username,email,mobileNumber, password,confirmPassword);
        setIsAuthenticated(true);
        return customerDetails;
    }

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
    };
   // const handlePasswordchange=async(username, oldPassword,newPassword){return userDetails;};

    return {
        isAuthenticated: isAuthenticated,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        handleSignUp:handleSignUp
    };
}
