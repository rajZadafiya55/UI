import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const isAuthenticated = () => {
 const auth =  JSON.parse(localStorage.getItem("AdminData"));
  return auth; 
};

const PrivateRoute = ({ element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
