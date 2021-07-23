import { combineReducers } from 'redux';
import { authReducer } from './auth';

//Root Reducer combines all reducers and exports it a default here
const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
