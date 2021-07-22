import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//1. Import from react-redux and redux
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

//2. Create user reducer function

//3. Combine multiple reducers when app scope becomes large

//4. Create Redux Store
//Passing rootReducer as first is imp
const store = createStore(rootReducer, composeWithDevTools());

//5. Provide Redux store to the entire application
//After creating a store, We need to provide it to the ap

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
