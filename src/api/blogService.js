import axios from '@/api/axiosConfig'

export async function getBlogs({ page, perPage, sort }) {
    let params = {
        page: page,
        perPage: perPage,
        sort: sort
    };
    try {
        let { data } = await axios.get('/api/restify/blogs', { params });
        return data;
    } catch (error) {
        return error;
    }
}

