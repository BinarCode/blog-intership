import axios from '@/api/axiosConfig';

export default {
    async updateProfile(data) {
        return await axios.put('/api/register', data);
    }
}