import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

//Securing route with Skeleton PrivateRoute component
const PrivateRoute = ({ ...rest }) => {
  const { auth } = useSelector((state) => ({ ...state }));

  //Check if auth data is present in Redux, If yes, Give access to protected route, Else redirect to login page
  return auth && auth.token ? <Route {...rest} /> : <Redirect to='/login' />;
};

export default PrivateRoute;
