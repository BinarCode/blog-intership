import axios from 'axios';


export default {
    async blogSearchResults(searchTerm, token) {
        return await axios.get(`/api/restify/blogs?sort=-views&search=${searchTerm}`, { headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
             }
          })
    },
    async getBlog(blogId, token) {
        return await axios.get(`/api/restify/blogs/${blogId}`, { headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
             }
          } )
    }
}
