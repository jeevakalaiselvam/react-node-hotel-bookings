import axios from 'axios';

export const register = async (user) =>
  axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user) =>
  axios.post(`${process.env.REACT_APP_API}/login`, user);

//Update user info in local storage
export const updateUserInLocalStorage = (user, next) => {
  if (window.localStorage.getItem('auth')) {
    let auth = JSON.parse(window.localStorage.getItem('auth'));
    //Add user information in auth object already present in Local storage
    auth.user = user;
    window.localStorage.setItem(JSON.stringify(auth));
    //Execute callback after data is stored in local storage
    next();
  }
};
