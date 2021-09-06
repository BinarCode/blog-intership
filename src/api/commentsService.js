import axios from '@/api/axiosConfig';

export async function createComment(data) {
    try {
        await axios.post('/api/restify/comments', data);
    } catch (error) {
        return error;
    }
}

export async function getBlogComments(blogId) {
    let params = {
        related: 'comments,creator'
    };
    try {
        let { data } = await axios.get(`/api/restify/blogs/${blogId}`, { params });
        return data.relationships.comments;
    } catch (error) {
        return error;
    }
}

export async function deleteComment(commId) {
    try {
        await axios.delete(`/api/restify/comments/${commId}`);
    } catch (error) {
        return error;
    }
}