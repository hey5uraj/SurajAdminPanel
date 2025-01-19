import { use } from 'react';
import { createContext, useContext, useEffect, useState } from 'react'


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState("")
    const authorizationToken = `Bearer ${token}`;

    // Remove token in localstorage
    let isLoggedIn = !!token;


    // Store token in localstorage
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken)
    }


    const LogoutUser = () => {
        setToken(null);
         setUser("");
        return localStorage.removeItem('token')
    }



    // jwt Authentication -to get the currently user data

    const userAuthentication = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("https://surajadminpanel.netlify.app/api/auth/user", {
                method: 'GET',
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.userData);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error fetching user data");
        }
    };


    const getServicesData = async () => {
        try {
            const res = await fetch(`https://surajadminpanel.netlify.app/api/data/service`, {
                method: 'GET',
            })
            if (res.ok) {
                const data = await res.json();
                // console.log("my auth service data", data.msg)
                setServices(data.msg);
            }
        } catch (error) {
            console.log(`services frontend error: ,${error}`);
        }
    }



    useEffect(() => {
        if(token){
            userAuthentication();
        }
        getServicesData();
    }, [token])

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services, authorizationToken,isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    // return useContext(AuthContext)
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return authContextValue;
}