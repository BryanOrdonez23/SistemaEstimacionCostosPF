import { createContext, useState, useContext, useEffect} from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthContext");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const singup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
    console.log(error.response);
      setErrors(error.response.data);
      
  }};

  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
    if(Array.isArray(error.response.data)){
      return setErrors(error.response.data);
    }
    setErrors([error.response.data.message]); 
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    if (errors.length > 0) {
     const timer= setTimeout(() => {
        setErrors([]);
      }, 5000)
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token){
        console.log("no hay token");
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        
        if(!res.data){
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
    
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        singup,
        loading,
        isAuthenticated,
        errors,
        singin,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
