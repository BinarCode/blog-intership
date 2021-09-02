import axios from '@/api/axiosConfig';

export async function createComment(data) {
    try {
        await axios.post('/api/restify/comments', data);
    } catch (error) {
        return error;
    }
}

export async function getBlogComments(blogId) {
    try {
        let { data } = await axios.get(`/api/restify/blogs/${blogId}?related=comments,creator`);
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