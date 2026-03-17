// import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

// export default function ProtectedRoute({ children }: any) {

//   const { user, loading } = useAuth();

//   if (loading) return null;

//   if (!user) return <Navigate to="/signin" />;

//   return children;
// }


import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {

  const { user, loading ,token,logout} = useAuth();
  console.log("User from context",user);
  

  if (loading) return null;

  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  
// logout();
  return <Outlet />;
}


 function AuthRoute() {

  const { user, loading ,token,logout} = useAuth();

  if (loading) return null;

  if (token) {
    return <Navigate to="/" replace />;
  }
  
  

  return <Outlet />;
}

export{AuthRoute,ProtectedRoute}