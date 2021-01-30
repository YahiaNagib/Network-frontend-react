import http from './httpService';
import apiEndPoint from "./appService";
import jwtDecode from "jwt-decode";

const apiEndpoint = apiEndPoint + 'auth';

const tokenKey = "token";

http.setJwt(getJwt())

export async function login(username, password) {
    const { data: jwt } = await http.post(apiEndpoint, { username, password })
    localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
    localStorage.setItem(tokenKey, jwt)
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        const user = jwtDecode(jwt);
        // http.get(apiEndPoint + "users/" + user._id).then((response) => {
        //     const {following, followers} = response.data;
        //     user.following = following;
        //     user.followers = followers;
        //   });
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