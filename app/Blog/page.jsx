"use client";
import React, { useEffect, useState } from "react";
import BlogService from "../Service/BlogService";
import Link from "next/link";

export default function page() {
  const [blogs, setBlogs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await BlogService.fetchBlogs(1, 10);

      if (!response?.data || response.data.length === 0) {
        throw new Error("Gagal memuat data blog");
      }

      setBlogs(response.data);
      setRecentBlogs(response.data.slice(0, 2));
      setError(null);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(error?.message || "Gagal mengambil data blog");
      setBlogs([]);
      setRecentBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32">
      <div className="container mx-auto px-6 lg:px-0 mb-20">
        <div className="mt-10 text-center border-b border-gray-300 pb-10">
          <h1 className="text-3xl lg:text-4xl font-semibold text-primary">
            Kabar Ketewel
          </h1>
          <p className="font-light">{blogs.length} Data</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Memuat data blog...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 mt-6">
            <p className="text-red-600 mb-3">Error: {error}</p>
            <button
              onClick={fetchBlogs}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600">Tidak ada data blog tersedia</p>
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <>
            <div className="mt-10">
              <h1 className="text-2xl font-medium text-primary">
                Berita Terbaru
              </h1>
              <div
                id="recentBlogs"
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8"
              >
                {recentBlogs.map((blog) => (
                  <Link href={`/Blog/${blog.id}`} key={blog.id}>
                    <div>
                      <div className="h-96 overflow-hidden">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                      </div>
                      <h1 className="mt-4 font-light text-sm">By Admin</h1>
                      <h1 className="mt-2 font-medium text-primary text-sm">
                        {blog.type.toUpperCase()}
                      </h1>
                      <h2 className="font-medium text-xl">{blog.title}</h2>
                      <p className="text-sm font-light mt-4">{blog.published_on}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-20">
              <div
                id="blogs"
                className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10"
              >
                {blogs.map((blog) => (
                  <Link href={`/Blog/${blog.id}`} key={blog.id}>
                    <div>
                      <div className="h-96 overflow-hidden">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        />
                      </div>
                      <h1 className="mt-4 font-light text-sm">By Admin</h1>
                      <h2 className="font-medium text-xl">{blog.title}</h2>
                      <p className="text-sm font-light mt-4">{blog.published_on}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
