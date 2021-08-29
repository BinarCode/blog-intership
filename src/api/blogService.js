import axios from '@/api/axiosConfig';
import get from 'lodash/get';


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

export async function getEditBlog(blogId) {
    try {
        let { data } = await axios.get(`/api/restify/blogs/${blogId}`);
        let tags = data.attributes.tags.map(el => el.value).join(', ') || '';
        return {
            title: get(data, 'attributes.title', ''),
            tags,
            content: get(data, 'attributes.content', ''),
        };
    } catch (error) {
        return error;
    }
}

export async function updateBlog({ blogId, data }) {
    try {
        return await axios.put(`/api/restify/blogs/${blogId}`, data);
    } catch (error) {
        return error;
    }
}

export async function createBlog(data) {
    try {
        return await axios.post(`/api/restify/blogs/`, data);
    } catch (error) {
        return error;
    }
}