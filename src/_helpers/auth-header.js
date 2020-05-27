import {authenticationService} from '../_services/authentication.service';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return {
            "Content-Type": "application/json",
            "x-api-token": `${currentUser.token}`
        };
    } else {
        return {};
    }
}