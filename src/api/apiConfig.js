import axios from 'axios';
import config from './config';
import authService from './authService'

axios.defaults.baseURL = config.API_HOST;
export const statusCodesToHandle = [400, 401, 403, 404, 500];

export function successInterceptor(response) {
    return response.data;
}

export async function errorInterceptor(error) {
    const { status } = error.response;
    let errors = '';

    if (statusCodesToHandle.includes(status)) {
        errors = mapErrors(error.response.data);
    }

    error.errors = errors;

    return Promise.reject(error);
}

export function requestInterceptor(config) {
    const token = authService.getToken();

    if (!config.headers['Authorization'] && token) {
        config.headers['Authorization'] = token;
    }

    return config;
}

function mapErrors(data) {
    let errors = '';

    if (typeof data === 'string') {
        return data
    }
    if (!data.errors && data.message) {
        return data.message
    }
    if (Array.isArray(data.errors)) {
        const hasStringErrors = typeof data.errors[0] === 'string'

        if (hasStringErrors) {
            return data.errors[0]
        }

        data.errors = data.errors[0]
    }
    for (let err in data.errors) {
        let errorRow = data.errors[err].join('</br>');
        if (!errorRow.endsWith('</br>')) {
            errorRow += '</br>';
        }
        errors += errorRow;
    }
    return errors;
}

axios.interceptors.response.use(successInterceptor, errorInterceptor);
axios.interceptors.request.use(requestInterceptor);
