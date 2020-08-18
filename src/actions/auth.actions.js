import axios from 'axios';
import jwtdecode from 'jwt-decode';

import authenticate from '../helpers/authenticate';

import { SET_USER, GET_ERRORS } from './';

const getErrors = function (errors) {
    return {
        type: GET_ERRORS,
        payload: errors
    }
}

const setUser = function (user) {
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
            const token = res.data;
            localStorage.setItem('sessionToken', token);
            authenticate(token);
            dispatch(setUser(jwtdecode(token)));
        })
        .catch(err => dispatch(getErrors(err.response.data)));
}


export const logoutUser = (history) => (dispatch) => {
    localStorage.removeItem('sessionToken');
    authenticate(null);
    dispatch(setUser({}));
    history.push('/');
}