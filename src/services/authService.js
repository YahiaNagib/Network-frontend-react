import http from './httpService';
import apiEndPoint from "./appService";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiEndPoint + 'auth';

// Name of the variable stored in the local storage to store the jwt
const tokenKey = "token";

// setJwt: is a function in the http module used to include the jwt in the headers
// getJwt: used to get the jwt from the local storage
// It is done this way to avoid circular imports
http.setJwt(getJwt())

// Login a user
// get jwt from the backend then store it in the local storage
export async function login(username, password) {
    const { data: jwt } = await http.post(apiEndpoint, { username, password })
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt)
}

// Logout to delete the jwt from the local storage
export function logout() {
    localStorage.removeItem(tokenKey);
}

// Decode the jwt to get the user (id and username only)
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        const user = jwtDecode(jwt);
        return user
    }
    catch (ex) {
        return null;
    }
}

export function getJwt() {
    return localStorage.getItem(tokenKey)
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
}