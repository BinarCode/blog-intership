import axios from '@/api/axiosConfig';

export default {
    async getProfile() {
        return await axios.get('/api/restify/profile?related=blogs,comments,media');
    },

    async updateProfile(data) {
        return await axios.put('/api/restify/profile', data);
    },

    async clearAvatar() {
        return await axios.post('/api/restify/profile', { avatar: null });
    },

    // to move in blogService
    async getBlog(id) {
        return await axios.get(`/api/restify/blogs/${id}`);
    }
}