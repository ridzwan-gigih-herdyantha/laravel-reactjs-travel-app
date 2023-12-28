//import axios
import axios from 'axios'

//import js cookie
import Cookies from 'js-cookie';

const Api = axios.create({
    
    //set endpoint API
    baseURL: process.env.REACT_APP_BASEURL,

    //set header axios
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
});

//handle unathenticated
Api.interceptors.response.use(function (response) {

    //return response
    return response;
}, ((error) => {

    //check if response unauthenticated
    if (401 === error.response.status) {

        //remove token
        Cookies.remove('token');

        window.location = '/login';
    } else {

        //reject promise error
        return Promise.reject(error);
    }
}));

const ApiImg = process.env.REACT_APP_IMG
const ApiBaseUrl = process.env.REACT_APP_BASEURL
const LinkUrl = process.env.REACT_APP_FRONT_END

export {Api, ApiImg, ApiBaseUrl, LinkUrl}