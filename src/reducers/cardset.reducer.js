import { GET_CARDSETS } from '../actions';

const initialState = {
    sets: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CARDSETS:
            return {
                sets: action.payload
            }
        default:
            return state;
    }
}