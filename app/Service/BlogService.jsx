import axios from "axios";
const BaseURL = process.env.NEXT_PUBLIC_API_URL;

const BlogService = {

// fetch all blogs or by type
    async fetchBlogs(page, pageSize, type) {
    if (type) {
      const response = await axios.get(`${BaseURL}/blogs/public?page=${page}&page_size=${pageSize}&type=${type}`);
      return response.data;
    }
    const response = await axios.get(`${BaseURL}/blogs/public?page=${page}&page_size=${pageSize}`);
    return response.data;
  },

//   fetch by id blog
  async fetchBlogById(id) {
    const response = await axios.get(`${BaseURL}/blogs/public/${id}`);
    return response.data;
  },


//   fetch by type blogs
  async fetchBlogByType(type, page, pageSize) {
    const response = await axios.get(`${BaseURL}/blogs/public/type/${type}?page=${page}&page_size=${pageSize}`);
    return response.data;
  }

};

export default BlogService;