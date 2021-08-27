import axios from 'axios';



export async function getBlogSearchResults (searchTerm, token) {
        return await axios.get(`/api/restify/blogs?sort=-views&search=${searchTerm}`, { headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
             }
          })
    }

export async function getBlog(blogId, token) {
        return await axios.get(`/api/restify/blogs/${blogId}`, { headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
             }
          } )
    }

