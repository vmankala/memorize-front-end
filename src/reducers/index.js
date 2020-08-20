import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import validateReducer from './validate.reducer';
import cardsetReducer from './cardset.reducer';
import cardReducer from './card.reducer';

export default combineReducers({
    auth: authReducer,
    validate: validateReducer,
    cardsets: cardsetReducer,
    cards: cardReducer
});