import {authHeader} from '../_helpers/auth-header';
import {handleResponse} from '../_helpers/handle-response';

export const growService = {
    getAll,
    getById,
    updateById,
    toggleGrowById,
    createNew,
    deleteGrow,
    getGrowDataEvents,
    getTimelineEvents,
    createNewTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent
};

function getAll(isActive) {
    let tempHeaders = authHeader();
    tempHeaders["x-api-active"] = isActive;

    const requestOptions = {method: 'GET', headers: tempHeaders};
    return fetch(global.apiUrl + `/grows`, requestOptions).then(handleResponse);
}

// TODO: left off here 1/5/2021
function getById(_id) {
    let tempHeaders = authHeader();
    tempHeaders["x-api-limit"] = 100;

    const requestOptions = {method: 'GET', headers: tempHeaders};
    return fetch(global.apiUrl + `/grows/` + _id, requestOptions).then(handleResponse);
}

function updateById(grow) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(grow)
    };

    return fetch(global.apiUrl + `/grows/` + grow._id, requestOptions).then(handleResponse);
}

function toggleGrowById(grow) {
    grow.isActive = !grow.isActive;

    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(grow),
    };

    return fetch(global.apiUrl + `/grows/` + grow._id, requestOptions).then(handleResponse);
}

function createNew(grow) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(grow)
    };

    return fetch(global.apiUrl + `/grows/`, requestOptions).then(handleResponse);
}

function deleteGrow(_id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(global.apiUrl + `/grows/` + _id, requestOptions).then(handleResponse);
}

function getGrowDataEvents(_id, limit) {
    let headers = authHeader();
    headers["x-api-limit"] = limit;

    const requestOptions = {method: 'GET', headers: headers};
    return fetch(global.apiUrl + `/grows/` + _id + `/events`, requestOptions).then(handleResponse);
}

function getTimelineEvents(_id) {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(global.apiUrl + `/grows/` + _id + `/timeline`, requestOptions).then(handleResponse);
}

function createNewTimelineEvent(_id, event) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(event)
    };

    return fetch(global.apiUrl + `/grows/` + _id + `/timeline`, requestOptions).then(handleResponse);
}

function updateTimelineEvent(_id, event) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(event)
    };

    return fetch(global.apiUrl + `/grows/` + _id + `/timeline/` + event._id, requestOptions).then(handleResponse);
}

function deleteTimelineEvent(growId, eventId) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(global.apiUrl + `/grows/` + growId + `/timeline/` + eventId, requestOptions).then(handleResponse);
}