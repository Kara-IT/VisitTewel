"use client";

import React, { useState, useEffect } from "react";
import BlogService from "../Service/BlogService";
import Card from "./Card";
import { MoveRight } from "lucide-react";

export default function Tab() {
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("Semua");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  async function fetchData(tabType) {
    try {
      setLoading(true);
      let response;
      if (tabType === "Semua") {
        response = await BlogService.fetchBlogs(1, 8);
      } else if (tabType === "Berita") {
        response = await BlogService.fetchBlogs(1, 8, "berita");
      } else if (tabType === "Pengumuman") {
        response = await BlogService.fetchBlogs(1, 8, "pengumuman");
      }
      
      // ✅ Handle nested data structure safely
      const blogData = response?. data || response || [];
      setBlogs(Array.isArray(blogData) ? blogData : []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Safe fallback
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  return (
    <div className="mt-8">
      <div className="tabs">
        {/* TAB 1: SEMUA */}
        <input
          type="radio"
          name="my_tabs_2"
          className="tab hidden md:block checked:border-b-primary checked:text-primary text-[16px] checked:border-b"
          defaultChecked
          aria-label="Semua"
          onChange={() => setActiveTab("Semua")}
        />
        <div className="tab-content border-t border-t-base-300 pt-10">
          <div className="grid grid-cols-1 md: grid-cols-2 lg:grid-cols-4 gap-6">
            {safeBlogs.length > 0 ? (
              safeBlogs.slice(0, 8).map((blog) => (
                <Card
                  key={blog.id}
                  id={blog.id}
                  coverImage={blog.coverImage}
                  title={blog.title}
                  type={blog.type}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Tidak ada blog tersedia
              </p>
            )}
          </div>
          {safeBlogs.length > 0 && (
            <div className="mt-8 text-center lg:text-end">
              <button className="text-primary flex items-center gap-1 justify-center lg:justify-end w-full">
                Lihat Semua <MoveRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        {/* TAB 2: BERITA TERBARU */}
        <input
          type="radio"
          name="my_tabs_2"
          className="tab hidden md:block checked:border-b-primary hover:text-primary text-[16px] checked:border-b"
          aria-label="Berita Terbaru"
          onChange={() => setActiveTab("Berita")}
        />
        <div className="tab-content border-t border-t-base-300 bg-base-100 py-10">
          <div className="grid grid-cols-1 md: grid-cols-2 lg: grid-cols-4 gap-6">
            {safeBlogs.length > 0 ?  (
              safeBlogs. slice(0, 8).map((blog) => (
                <Card
                  key={blog.id}
                  id={blog.id}
                  coverImage={blog. coverImage}
                  title={blog.title}
                  type={blog.type}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Tidak ada berita tersedia
              </p>
            )}
          </div>
          {safeBlogs.length > 0 && (
            <div className="mt-8 text-center lg:text-end">
              <button className="text-primary flex items-center gap-1 justify-center lg:justify-end w-full">
                Lihat Semua <MoveRight className="size-4" />
              </button>
            </div>
          )}
        </div>

        {/* TAB 3: PENGUMUMAN */}
        <input
          type="radio"
          name="my_tabs_2"
          className="tab hidden md:block checked:border-b-primary hover:text-primary text-[16px] checked:border-b"
          aria-label="Pengumuman"
          onChange={() => setActiveTab("Pengumuman")}
        />
        <div className="tab-content border-t border-t-base-300 bg-base-100 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safeBlogs.length > 0 ? (
              safeBlogs.slice(0, 8).map((blog) => (
                <Card
                  key={blog.id}
                  id={blog.id}
                  coverImage={blog.coverImage}
                  title={blog.title}
                  type={blog. type}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Tidak ada pengumuman tersedia
              </p>
            )}
          </div>
          {safeBlogs. length > 0 && (
            <div className="mt-8 text-center lg:text-end">
              <button className="text-primary flex items-center gap-1 justify-center lg: justify-end w-full">
                Lihat Semua <MoveRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
