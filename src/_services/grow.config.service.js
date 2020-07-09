import { authHeader } from '../_helpers/auth-header';
import { handleResponse } from '../_helpers/handle-response';

export const growConfigService = {
    create,
    getAll,
    getById,
    updateById,
    deleteConfig
};

function create(config) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(config)
    };

    return fetch(`http://204.48.25.187/configs/`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://204.48.25.187/configs`, requestOptions).then(handleResponse);
}

function getById(_id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`http://204.48.25.187/configs/` + _id, requestOptions).then(handleResponse);
}

function updateById(config) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(config)
    };

    return fetch(`http://204.48.25.187/configs/` + config._id, requestOptions).then(handleResponse);
}

function deleteConfig(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://204.48.25.187/configs/` + id, requestOptions).then(handleResponse);
}