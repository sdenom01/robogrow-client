import { authHeader } from '../_helpers/auth-header';
import { handleResponse } from '../_helpers/handle-response';

export const growConfigService = {
    create,
    getAll,
    getById,
    updateById
};

function create(config) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(config)
    };

    return fetch(`http://localhost:3000/configs/`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:3000/configs`, requestOptions).then(handleResponse);
}

function getById(_id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://localhost:3000/configs/` + _id, requestOptions).then(handleResponse);
}

function updateById(config) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(config)
    };

    return fetch(`http://localhost:3000/configs/` + config._id, requestOptions).then(handleResponse);
}