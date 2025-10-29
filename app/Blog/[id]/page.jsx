"use client";
import React, { useEffect, useState } from "react";
import BlogService from "../../Service/BlogService";

export default function Page({ params }) {
  const blogParams = React.use(params);
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await BlogService.fetchBlogById(blogParams.id);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [blogParams.id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="pt-18 lg:pt-36">
      <div className="container mb-18 mx-auto px-6 mt-10 lg:px-52">
        <p className="text-primary font-medium">{blog.type.toUpperCase()}</p>
        <h1 className="text-3xl lg:text-4xl font-semibold mt-1">{blog.title}</h1>
        <div className="flex gap-4 font-light mt-4">
          <h1>Admin</h1>
          <h2>{blog.published_on}</h2>
        </div>
        <div className="mt-10">
          <img src={blog.coverImage} alt={blog.title} className="w-full" />
          <div className="mt-10 text-justify font-light" dangerouslySetInnerHTML={{ __html: blog.description }} />
        </div>
      </div>
    </div>
  );
}
