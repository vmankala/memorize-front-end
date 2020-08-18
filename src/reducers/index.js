import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import validateReducer from './validate.reducer';

export default combineReducers({
    auth: authReducer,
    validate: validateReducer
});