import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/api";
import { authService } from "../api/AuthApi";


interface User {
  _id: string;
  email: string;
  role: string;
  active: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
  loginUser:(email:string,password:string)=>void;
  signupUser:(email:string,password:string)=>void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: any) {
   

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [loading, setLoading] = useState(true);

  // =========================
  // LOGIN
  // =========================
  const login = (token: string, user: User) => {
    
    localStorage.setItem("token", token);

    setToken(token);
    setUser(user);

  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {

    localStorage.removeItem("token");

    setUser(null);
    setToken(null);

  };
  

const loginUser = async (email: string, password: string) => {
  const res = await authService.login(email, password);
  console.log("response",res);

  login(res.token, res.user);
   if(res.token){
    alert("Success")
    
  }
};

const signupUser = async (email: string, password: string) => {
  const res = await authService.signup(email, password);
  console.log("response",res);
  

  login(res.token, res.user);
  if(res.token){
    alert("Success")
    

  }
};

  // =========================
  // TOKEN EXPIRATION CHECK
  // =========================
  useEffect(() => {

    if (!token) {
      setLoading(false);
      return;
    }

    try {

      const decoded: any = jwtDecode(token);

      const expiry = decoded.exp * 1000;

      if (Date.now() > expiry) {
        logout();
      } else {

        const timeout = expiry - Date.now();

        setTimeout(() => {
          logout();
        }, timeout);

      }

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

    } catch {

      logout();

    }

    setLoading(false);

  }, [token]);

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        loading,
        loginUser,
        signupUser

      }}
    >
      {children}
    </AuthContext.Provider>

  );
}