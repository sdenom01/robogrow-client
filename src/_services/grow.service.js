import {authHeader} from '../_helpers/auth-header';
import {handleResponse} from '../_helpers/handle-response';

export const growService = {
    getAll,
    getById,
    updateById,
    endGrowById,
    createNew,
    getTimelineEvents,
    createNewTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent
};

function getAll() {
    const requestOptions = {method: 'GET', headers: authHeader()};
    return fetch(global.apiUrl + `/grows`, requestOptions).then(handleResponse);
}

function getById(_id) {
    let tempHeaders = authHeader();
    tempHeaders.x_api_limit = 100;

    console.log("heacers: " + JSON.stringify(tempHeaders));

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

function endGrowById(grow) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(grow),
    };

    return fetch(global.apiUrl + `/grows/` + grow._id + `/end`, requestOptions).then(handleResponse);
}

function createNew(grow) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(grow)
    };

    return fetch(global.apiUrl + `/grows/`, requestOptions).then(handleResponse);
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