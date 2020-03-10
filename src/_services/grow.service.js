import { authHeader } from '../_helpers/auth-header';
import { handleResponse } from '../_helpers/handle-response';

export const growService = {
    getAll,
    getById
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:3000/grows`, requestOptions).then(handleResponse);
}

function getById(_id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:3000/grows/` + _id, requestOptions).then(handleResponse);
}