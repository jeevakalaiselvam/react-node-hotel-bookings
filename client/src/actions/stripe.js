import axios from 'axios';

//Use token and create a post request with end point in back end
export const createConnectAccount = async (token) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, //Adding authentication JWT token to server for user authentication
      },
    }
  );

//Send user information to backend after user successfully completes Stripe signup process by providing email, phone, address and bank information
export const getAccountStatus = async (token) => {
  axios.post(`${process.env.REACT_APP_API}/get-account-status`, {
    headers: {
      Authorization: `Bearer ${token}`, //Adding authentication JWT token to server for user authentication
    },
  });
};
