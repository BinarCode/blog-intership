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
    async login(data) {
        return await axios.post('/api/login', data);
    },
    async forgotPassword(data) {
        return await axios.post('/api/forgotPassword', data);
    }

}