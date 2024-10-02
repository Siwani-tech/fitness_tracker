import { createContext, useContext, useEffect, useState } from "react";
import useLocalstorage from "../components/auth/useLocalstorage";

export const AuthCreateContext = createContext({
  storedValue: null,
  setValue: () => {},
  login: () => {},
  logout: () => {},
  signup: () => {},
});

export const AuthProvider = ({ children }) => {
  const [storedValue, setValue, getValue, removeValue] = useLocalstorage(
    "user",
    null
  );
  const [authenticateUser, setauthenticateUser]=useState(false);

  useEffect(()=>{
    console.log("Checking authentication status...",storedValue);
    if(storedValue){
      setauthenticateUser(true);
    }
    else{
      setauthenticateUser(false);
    }
    
  },[storedValue])

  const signup = async (userData) => {
    try {
      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setValue(data.token);
        
      }
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (userData) => {
    try {
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json(); 
      console.log("Login response data:", data);

      if (response.ok) {
        setValue(data.token);
        
      } else {
        console.error("Login failed:", data.message);
      }
      return data;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:4000/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        removeValue();
        
      } else {
        console.log("something went wrong");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthCreateContext.Provider value={{ storedValue,authenticateUser, login, logout, signup }}>
      {children}
    </AuthCreateContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthCreateContext);
}
