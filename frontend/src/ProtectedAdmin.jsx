import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "./context/AdminContext";

 function ProtectedAdmin() {
  const { isAuthenticated, loading } = useAdmin();
  
  if (loading) return <h1>Loading...</h1>;
  if (!loading && !isAuthenticated  ) return <Navigate to="/administrador/login" replace />;
 
  return <Outlet />;
 }

export default ProtectedAdmin;