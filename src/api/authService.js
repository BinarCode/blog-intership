import axios from 'axios';

export default {
    setToken(token) {
        localStorage.setItem('token', token);
    },
    getToken() {
        return localStorage.getItem('token');
    },
    async register(data) {
        return await axios.post('/api/register', data);
    },
    async resetPassword(data) {
        return await axios.post('/api/resetPassword', data);
    },
}