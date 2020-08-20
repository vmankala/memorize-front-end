import axios from 'axios';

import { GET_CARDSETS, REMOVE_CARDSET, ADD_CARDSET, EDIT_CARDSET } from './';
import { getErrors } from './validate.actions';

export const setCardsets = function(sets) {
    return {
        type: GET_CARDSETS,
        payload: sets
    }
}

const removeCardset = function(id) {
    return {
        type: REMOVE_CARDSET,
        payload: id
    }
}

const addCardset = function(data) {
    return {
        type: ADD_CARDSET,
        payload: data
    }
}

const editCardset = function(data) {
    return {
        type: EDIT_CARDSET,
        payload: data
    }
}

export const getCardsets = () => (dispatch) => {
    axios.post('http://localhost:3000/cardsets')
        .then(res => dispatch(setCardsets(res.data)))
        .catch(err => dispatch(getErrors(err.response.data)));
}

export const deleteCardset = (id) => (dispatch) => {
    axios.post('http://localhost:3000/cardsets/' + id + '/delete')
        .then(res => dispatch(removeCardset(res.data._id)))
        .catch(err => dispatch(getErrors(err.response.data)));
}

export const createCardset = (formData) => (dispatch) => {
    axios.post('http://localhost:3000/cardsets/new', formData)
        .then(res => {
            dispatch(addCardset(res.data));
            dispatch(getErrors({}));
        })
        .catch(err => dispatch(getErrors(err.response.data)));
}

export const updateCardset = (id, formData) => (dispatch) => {
    axios.post('http://localhost:3000/cardsets/' + id + '/edit', formData)
        .then(res => {
            dispatch(editCardset(res.data));
            dispatch(getErrors({}));
        })
        .catch(err => dispatch(getErrors(err.response.data)));
}