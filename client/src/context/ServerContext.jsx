import axios from "axios";
import { createContext, useState } from "react";

export const ServerContext = createContext();

export const ServerProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [loading, setLoading] = useState(false);

    const signup = async (name, email, password) => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/signup", {
                name,
                email,
                password,
            });
            console.log(response.data);
            setAccount(response.data.user);
            setLoading(false);
        } catch (error) {
            throw error;
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/login", {
                email,
                password,
            });
            console.log(response.data);
            setAccount(response.data.user);
            setLoading(false);
        } catch (error) {
            throw error;
            setLoading(false);
        }
    };
    
    return (
        <ServerContext.Provider value={{ account, signup, loading, login }}>
            {children}
        </ServerContext.Provider>
    );
}   