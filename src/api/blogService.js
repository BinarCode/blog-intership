import axios from "axios";

export default {
    async getBlogs(page, perPage) {
        const token = localStorage.getItem('token');
        return await axios.get(`/api/restify/blogs?mostViewed&page=${page}&perPage=${perPage}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
    },
}

