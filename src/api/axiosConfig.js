import axios from 'axios';
import config from './config';
import get from 'lodash/get';

const instance = axios.create({
    baseURL: config.API_HOST,
    statusCodesToHandle: [400, 401, 403, 404, 500]
});

function getErrorsArr(err) {
    let errorsArr = [];
    const errors = Object.values(get(err, 'response.data.errors', ''));
    if (!errors.length) return;
    errors.forEach((el) => {
        el.forEach((item) => errorsArr.push(item));
    });
    return errorsArr;
}

function errorInterceptor(error) {
    if (!error.response)
        return error;
    const errorsArr = getErrorsArr(error);
    const message = get(error, 'response.data.message', '');
    return {
        errorsArr,
        message
    };
}

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (!config.headers.Authorization && token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        }
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(function (response) {
    return response.data;
},
    (error) => {
        return Promise.reject(errorInterceptor(error));
    }
);

export default instance;