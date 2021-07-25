import axios from 'axios';
import { log } from '../util/log';

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
  return await axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, //Adding authentication JWT token to server for user authentication
      },
    }
  );
};

//Getting Balance for User from backend which gets it from Stripe in backend
export const getAccountBalance = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, //Adding authentication JWT token to server for user authentication
      },
    }
  );
};

//Helper for formatting currency
export const currencyFormatter = (data = '0') => {
  log('AMOUNT PRESENT IN BALANCE FROM STRIPE DATA -> ', data);
  return data.amount.toLocaleString(data.currency, {
    style: 'currency',
    currency: data.currency,
  });
};

//
export const payoutSetting = async (token) =>
  await axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, //Adding authentication JWT token to server for user authentication
      },
    }
  );
