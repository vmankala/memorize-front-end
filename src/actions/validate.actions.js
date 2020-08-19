import { GET_ERRORS } from './';

export const getErrors = function (errors) {
    return {
        type: GET_ERRORS,
        payload: errors
    }
}