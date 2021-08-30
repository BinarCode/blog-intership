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
        let tags = typeof (data.attributes.tags) === 'string' ? JSON.parse(data.attributes.tags) : data.attributes.tags;
        tags = tags.map(el => el.value).join(', ') || '';
        console.log(tags);
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
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('tags', data.tags);
    formData.append('content', data.content);
    formData.append('image', data.image);
    try {
        return await axios.post(`/api/restify/blogs/`, formData);
    } catch (error) {
        return error;
    }
}

export async function uploadImage(image) {
    const formData = new FormData();
    formData.append('picture', image);

    try {
        let { data } = await axios.post(`/api/blog/image/`, formData);
        return data.path;
    } catch (error) {
        return error;
    }
}