import axios from "axios";
const BaseURL = process.env.NEXT_PUBLIC_API_URL;

const BlogService = {
  // fetch all blogs or by type
  async fetchBlogs(page, pageSize, type) {
    try {
      let response;
      if (type) {
        response = await axios. get(
          `${BaseURL}/blogs/public?page=${page}&page_size=${pageSize}&type=${type}`
        );
      } else {
        response = await axios.get(
          `${BaseURL}/blogs/public?page=${page}&page_size=${pageSize}`
        );
      }

      // ✅ Handle both response. data. data and response.data formats
      const data = response?. data?. data || response?.data || [];
      return {
        data:  Array.isArray(data) ? data : [],
        total: response?.data?.total || 0,
        page: page,
        pageSize: pageSize,
      };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      return {
        data: [],
        total: 0,
        page: page,
        pageSize: pageSize,
      };
    }
  },

  // fetch by id blog
  async fetchBlogById(id) {
    try {
      const response = await axios.get(`${BaseURL}/blogs/public/${id}`);
      // ✅ Handle nested data
      return response?. data?.data || response?.data || null;
    } catch (error) {
      console.error("Error fetching blog by ID:", error);
      return null;
    }
  },

  // fetch by type blogs
  async fetchBlogByType(type, page, pageSize) {
    try {
      const response = await axios.get(
        `${BaseURL}/blogs/public/type/${type}?page=${page}&page_size=${pageSize}`
      );
      
      const data = response?.data?.data || response?.data || [];
      return {
        data: Array.isArray(data) ? data : [],
        total: response?.data?. total || 0,
        page: page,
        pageSize:  pageSize,
      };
    } catch (error) {
      console.error("Error fetching blogs by type:", error);
      return {
        data: [],
        total: 0,
        page: page,
        pageSize:  pageSize,
      };
    }
  },
};

export default BlogService;
