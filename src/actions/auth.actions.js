import axios from 'axios';
import jwtdecode from 'jwt-decode';

import authenticate from '../helpers/authenticate';

import { SET_USER } from './';
import { getErrors } from './validate.actions';
import { setCardsets } from './cardset.actions';

export const setUser = function (user) {
    return {
        type: SET_USER,
        payload: user
    }
}

export const registerUser = (formData, history) => (dispatch) => {
    axios.post('http://localhost:3000/users/register', formData)
        .then(res => history.push('/login'))
        .catch(err => dispatch(getErrors(err.response.data)));
}


export const loginUser = (formData) => (dispatch) => {
    axios.post('http://localhost:3000/users/login', formData)
        .then(res => {
            const {token} = res.data;
            localStorage.setItem('sessionToken', token);
            authenticate(token);
            dispatch(setUser(jwtdecode(token)));
        })
        .catch(err => dispatch(getErrors(err.response.data)));
}


export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('sessionToken');
    authenticate(null);
    dispatch(setUser({}));
    dispatch(setCardsets([]));
}