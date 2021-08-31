import axios from '@/api/axiosConfig'

export async function getBlogs({ page, perPage, sort, related }) {
    let params = {
        page: page,
        perPage: perPage,
        sort: sort,
        related: related
    };
    try {
        let { data } = await axios.get('/api/restify/blogs', { params });
        return data;
    } catch (error) {
        return error;
    }
}

export async function getBlog(blogId) {
    return await axios.get(`/api/restify/blogs/${blogId}`)
}

