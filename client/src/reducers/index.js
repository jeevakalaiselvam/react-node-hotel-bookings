import { combineReducers } from 'redux';
import { authReducer } from './auth';
import 'antd/dist/antd.css';

//Root Reducer combines all reducers and exports it a default here
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
