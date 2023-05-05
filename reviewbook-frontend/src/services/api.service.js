import axios from 'axios';

const BaseURL = 'http://localhost:3000'

const BaseAPI = axios.create({
    baseURL: BaseURL,
    headers: {
        'Content-Type': 'Application/json',
        "Authorization": 'admin'
    }
})

axios.interceptors.request.use(function (config) {

    return config;
}, function (error) {
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default BaseAPI;