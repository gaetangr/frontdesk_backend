import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const token = localStorage.getItem("token")
// For routes that can only be accessed by authenticated users
function AuthGuard({ children }) {
  const auth = useSelector((state) => state.authReducer);
;
  if (!token) {
    return <Redirect to="/auth/sign-in" />;
  }

  return children;
}

export default AuthGuard;
