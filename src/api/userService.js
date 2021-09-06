import axios from '@/api/axiosConfig';

export default {
    async getProfile(params) {
        return await axios.get('/api/restify/profile', { params: params });
    },

    async updateProfile(data) {
        return await axios.put('/api/restify/profile', data);
    },

    async updateAvatar(data) {
        return await axios.post('/api/restify/profile', data);
    },

    async clearAvatar() {
        return await axios.post('/api/users/delete/avatar');
    },
}