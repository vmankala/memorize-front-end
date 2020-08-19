import axios from 'axios';

import { GET_CARDSETS } from './';
import { getErrors } from './validate.actions';

export const setCardsets = function(sets) {
    return {
        type: GET_CARDSETS,
        payload: sets
    }
}

export const getCardsets = () => (dispatch) => {
    axios.post('http://localhost:3000/cardsets')
        .then(res => dispatch(setCardsets(res.data)))
        .catch(err => dispatch(getErrors(err.response.data)));
}