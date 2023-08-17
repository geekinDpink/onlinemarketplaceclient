import { useContext } from "react";
import AuthContext from "../context/authProvider";
import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "./auth"; //authProvider v1

// basic authentication with context. For persistent login, use token
export const RequireAuth = ({ children }) => {
  const location = useLocation();

  const { auth } = useContext(AuthContext);
  // const auth = useAuth(); // authProvider v1

  // check if there is token in localstorage
  const token = localStorage.getItem("token");

  if (!auth.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};
