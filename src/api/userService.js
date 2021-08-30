import axios from '@/api/axiosConfig';

export default {
    async updateProfile(data) {
        return await axios.put('/api/restify/profile', data);
    },

    async clearAvatar() {
        return await axios.post('/api/restify/profile', { avatar: null });
    }
}