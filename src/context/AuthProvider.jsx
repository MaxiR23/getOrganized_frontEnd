import { createContext, useEffect, useState } from "react";
import axiosClient from "../config/axiosClient";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const authenticateUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient('users/profile', config)
                setAuth(data);
            } catch (error) {
                console.warn(error);
                setAuth({})
            } finally {
                setLoading(false)
            }

        }

        authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const logOut = () => {
        setAuth({})
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                loading,
                logOut,
                setAuth
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;