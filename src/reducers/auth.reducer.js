import { SET_USER } from '../actions';

const initialState = {
    user: {},
    loggedIn: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                loggedIn: Object.keys(action.payload).length !== 0,
                user: action.payload
            };
        default:
            return state;
    }
}