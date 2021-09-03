import axios from '@/api/axiosConfig';
import { createTagsArr } from '@/utility/tags';

function createFormData(data) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('tags', data.tags);
    formData.append('content', data.content);
    formData.append('image', data.image);
    return formData;
}

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
    let params = {
        related: 'creator'
    }
    try {
        let { data } = await axios.get(`/api/restify/blogs/${blogId}`, { params });
        return data;
    }
    catch (error) {
        return error;
    }
}

export async function addViewOnBlog(blogId) {
    try {
        let { data } = await axios.post(`/api/blogs/${blogId}/view`);
        return data;
    }
    catch (error) {
        return error;
    }
}

export async function deleteBlog(blogId) {
    try {
        let { data } = await axios.delete(`/api/restify/blogs/${blogId}`);
        return data;
    }
    catch (error) {
        return error;
    }
}

export async function createBlog(data) {
    data.tags = JSON.stringify(createTagsArr(data.tags));
    data = createFormData(data);
    try {
        return await axios.post(`/api/restify/blogs/`, data);
    } catch (error) {
        return error;
    }
}

export async function updateBlog({ blogId, data }) {
    data.tags = JSON.stringify(createTagsArr(data.tags));
    try {
        return await axios.put(`/api/restify/blogs/${blogId}`, data);
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


