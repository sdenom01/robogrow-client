import { authenticationService } from '../_services/authentication.service';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        console.log(currentUser.token);
        return { "x-api-token": `${currentUser.token}` };
    } else {
        return {};
    }
}