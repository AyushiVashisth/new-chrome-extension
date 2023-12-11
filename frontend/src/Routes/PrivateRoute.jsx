import React from "react";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isAuth = false;

  if (!isAuth) {
    return <Navigate to={"/signin"} />;
  } else {
    return <Route element={element} />;
  }
};

export default PrivateRoute;
