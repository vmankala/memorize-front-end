import axios from 'axios';

import { GET_CARDSET, REMOVE_CARD, ADD_CARD, EDIT_CARD } from './';
import { getErrors } from './validate.actions';

export const setCardset = function(set) {
    return {
        type: GET_CARDSET,
        payload: set
    }
}

const removeCard = function(id) {
    return {
        type: REMOVE_CARD,
        payload: id
    }
}

const addCard = function(data) {
    return {
        type: ADD_CARD,
        payload: data
    }
}

const editCard = function(data) {
    return {
        type: EDIT_CARD,
        payload: data
    }
}

export const getCardset = (id) => (dispatch) => {
    axios.post('http://localhost:3000/cardsets/' + id)
        .then(res => dispatch(setCardset(res.data)))
        .catch(err => dispatch(getErrors(err.response.data)));
}

export const deleteCard = (setId, cardId) => (dispatch) => {
    axios.post('http://localhost:3000/cardsets/' + setId + '/' + cardId + '/delete')
        .then(res => dispatch(removeCard(res.data)))
        .catch(err => dispatch(getErrors(err.response.data)));
}

export const createCard = (setId, formData) => (dispatch) => {
    axios.post('http://localhost:3000/cardsets/' + setId + '/new', formData)
        .then(res => {
            dispatch(addCard(res.data));
            dispatch(getErrors({}));
        })
        .catch(err => dispatch(getErrors(err.response.data)));
}

export const updateCard = (setId, cardId, formData) => (dispatch) => {
    axios.post('http://localhost:3000/cardsets/' + setId + '/' + cardId + '/edit', formData)
        .then(res => {
            dispatch(editCard(res.data));
            dispatch(getErrors({}));
        })
        .catch(err => dispatch(getErrors(err.response.data)));
}