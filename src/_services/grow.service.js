import { authHeader } from '../_helpers/auth-header';
import { handleResponse } from '../_helpers/handle-response';

export const growService = {
    getAll,
    getById,
    updateById,
    createNew
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:3000/grows`, requestOptions).then(handleResponse);
}

function getById(_id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:3000/grows/` + _id, requestOptions).then(handleResponse);
}

function updateById(grow) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(grow)
    };

    return fetch(`http://localhost:3000/grows/` + grow._id, requestOptions).then(handleResponse);
}

function createNew(grow) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(grow)
    };

    return fetch(`http://localhost:3000/grows/`, requestOptions).then(handleResponse);
}