

import {  Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NoAccess from "../OtherPage/NoAccess";

function RoleRoute() {

  const { user} = useAuth();
  
  

  

  if (user?.role!== "admin" && user?.role!== "manager") {
    return <NoAccess/>;
  }
  
// logout();
  return <Outlet />;
}




export{RoleRoute}