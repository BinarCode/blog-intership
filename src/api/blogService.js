import axios from '@/api/axiosConfig';

export async function getBlogs(searchTerm, { page, perPage, sort }) {
  let params = {
    page: page,
    perPage: perPage,
    sort: sort,
  };
  try {
    let { data } = await axios.get(
      '/api/restify/blogs?sort=-views&search=' + searchTerm,
      { params }
    );
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
