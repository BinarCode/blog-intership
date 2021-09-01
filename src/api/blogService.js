import axios from '@/api/axiosConfig';

export async function getBlogs({ search, page, perPage, sort }) {
  let params = {
    search,
    page,
    perPage,
    sort,
  };
  try {
    let { data } = await axios.get('/api/restify/blogs', { params });
    return data;
  } catch (error) {
    return error;
  }
}

export async function getBlogSearchResults(searchTerm) {
  return await axios.get(`/api/restify/blogs?sort=-views&search=${searchTerm}`);
}

export async function getBlog(blogId) {
  return await axios.get(`/api/restify/blogs/${blogId}`);
}
