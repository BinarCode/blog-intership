import axios from 'axios';

export default {
    async getBlog(blogId, token) {
        return await axios.get(`/api/restify/blogs/${blogId}`, { headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
             }
          } )
    }
}