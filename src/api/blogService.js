import axios from '@/api/axiosConfig'

export async function getBlogs({ page, perPage, sort }) {
    let config = {
        params: {
            page: page,
            perPage: perPage,
            sort: sort
        }
    };
    try {
        return await axios.get('/api/restify/blogs', config);
    } catch (error) {
        return error;
    }
}

