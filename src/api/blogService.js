
import axios from '@/api/axiosConfig'

export async function getBlogs(searchTerm, { page, perPage, sort }) {
    let params = {
        page: page,
        perPage: perPage,
        sort: sort
    };
    try {
        let { data } = await axios.get('/api/restify/blogs?sort=-views&search='+searchTerm, { params });
        return data;
    } catch (error) {
        return error;
    }
}

export async function getBlogSearchResults(searchTerm) {
    return await axios.get(`/api/restify/blogs?sort=-views&search=${searchTerm}`)
    }

    export async function getBlogSearchResultsPaginated(searchTerm, { page, perPage, sort }){
          let params = {
   
        page: page,
        perPage: perPage,
        sort: sort
    
 };
 return await axios.get(`/api/restify/blogs?sort=-views&search=${searchTerm}`,params)
}
// export async function getBlog(blogId, token) {
//         return await axios.get(`/api/restify/blogs/${blogId}`, { headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: 'application/json'
//              }
//           } )
//     }