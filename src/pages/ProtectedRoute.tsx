

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {

  const {  loading ,token} = useAuth();
  
  

  if (loading) return null;

  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  
// logout();
  return <Outlet />;
}


 function AuthRoute() {

  const {  loading ,token} = useAuth();

  if (loading) return null;

  if (token) {
    return <Navigate to="/" replace />;
  }
  
  

  return <Outlet />;
}

export{AuthRoute,ProtectedRoute}