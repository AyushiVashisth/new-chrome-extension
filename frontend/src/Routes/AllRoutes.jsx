import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HeadlineList from "../components/HeadlineList";
import LoginAndSignUp from "../pages/LoginAndSignUp";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginAndSignUp />} />
      <Route path="/signin" element={<LoginAndSignUp />} />
      <Route
        path="/headline"
        element={
          <PrivateRoute>
            <HeadlineList />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
};

export default AllRoutes;
