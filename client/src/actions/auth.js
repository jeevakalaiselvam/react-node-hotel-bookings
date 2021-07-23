import axios from 'axios';

export const register = async (user) =>
  axios.post(`${process.env.REACT_APP_API}/register`, user);

export const login = async (user) =>
  axios.post(`${process.env.REACT_APP_API}/login`, user);
