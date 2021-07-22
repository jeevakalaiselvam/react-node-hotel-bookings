import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//1. Import from react-redux and redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

//2. Create user reducer function
//Actions are of format -> { type: "LOGGED_IN_USER" , payload: { name: "Ryan" , role: "Seller"}}
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return action.payload;
    default:
      return { ...state }; //For default we always return the previous state
  }
};

//3. Combine multiple reducers when app scope becomes large

//4. Create Redux Store

//5. Provide Redux store to the entire application

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
