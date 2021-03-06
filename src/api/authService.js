import axios from '@/api/axiosConfig';

export default {
    setToken(token) {
        localStorage.setItem('token', token);
    },
    getToken() {
        return localStorage.getItem('token');
    },
    removeToken() {
        return localStorage.removeItem('token');
    },
    async register(data) {
        return await axios.post('/api/register', data);
    },

    async login(data) {
        return await axios.post('/api/login', data);
    },

    async resetPassword(data) {
        return await axios.post('/api/resetPassword', data);

    },

    async forgotPassword(data) {
        return await axios.post('/api/forgotPassword', data);
    }

}