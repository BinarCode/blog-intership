import axios from '@/api/axiosConfig';
import get from 'lodash/get';

function createTagsArray(tags) {
    tags = tags.split(',');
    return tags.map((el, index) => {
        let tagValue = el.trim();
        return tagValue.length ? {
            name: index,
            type: 'text',
            value: tagValue,
        } : false;
    });
}

function getTagsArray(tags) {
    return typeof (tags) === 'string' ? JSON.parse(tags) : tags;
}

export async function getBlogs({ page, perPage, sort }) {
    let params = {
        page: page,
        perPage: perPage,
        sort: sort
    };
    try {
        let { data } = await axios.get('/api/restify/blogs?related=creator', { params });
        return data;
    } catch (error) {
        return error;
    }
}

export async function getEditBlog(blogId) {
    try {
        let { data } = await axios.get(`/api/restify/blogs/${blogId}`);
        let tags = getTagsArray(get(data, 'attributes.tags', []));
        return await {
            title: get(data, 'attributes.title', ''),
            tags: tags.map(el => el.value).join(', ') || '',
            content: get(data, 'attributes.content', ''),
        };
    } catch (error) {
        return error;
    }
}

export async function updateBlog({ blogId, data }) {
    data.tags = JSON.stringify(createTagsArray(data.tags));
    try {
        return await axios.put(`/api/restify/blogs/${blogId}`, data);
    } catch (error) {
        return error;
    }
}

export async function createBlog(data) {
    const formData = new FormData();
    data.tags = JSON.stringify(createTagsArray(data.tags));
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

export async function getBlog(blogId) {
    return await axios.get(`/api/restify/blogs/${blogId}`)
}
