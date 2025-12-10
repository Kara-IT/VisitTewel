"use client"

import React, { useEffect, useState } from "react";
import Card from "./Card";
import { MoveRight } from "lucide-react";
import BlogService from "../Service/BlogService";

export default function Tab() {
  const [blogs, setBlogs] = useState([]);
  const [activeTab, setActiveTab] = useState("Semua");

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  async function fetchData(tabType) {
    try {
      let response;
      if (tabType === "Semua") {
        response = await BlogService.fetchBlogs(1, 8);
      } else if (tabType === "Berita") {
        response = await BlogService.fetchBlogs(1, 8, "berita");
      } else if (tabType === "Pengumuman") {
        response = await BlogService.fetchBlogs(1, 8, "pengumuman");
      }
      console.log(response);
      // ✅ Tambahkan check untuk memastikan response. data ada
      setBlogs(response?. data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]); // ✅ Set ke array kosong saat error
    }
  }

  return (
    <div className="mt-8">
      <div className="tabs">
        <input
          type="radio"
          name="my_tabs_2"
          className="tab hidden md:block checked:border-b-primary checked:text-primary text-[16px] checked:border-b"
          defaultChecked
          aria-label="Semua"
          onChange={() => setActiveTab("Semua")}
        />
        <div className="tab-content border-t border-t-base-300 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(blogs || []).slice(0, 8).map((blog) => (
              <Card key={blog.id} id={blog.id} coverImage={blog.coverImage} title={blog.title} type={blog.type} />
            ))}
          </div>
          <div className="mt-8 text-center lg:text-end">
            <button className="text-primary">
              Lihat Semua <MoveRight className="inline-block size-4 ml-1" />
            </button>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab hidden md:block checked:border-b-primary hover:text-primary text-[16px] checked:border-b"
          aria-label="Berita Terbaru"
          onChange={() => setActiveTab("Berita")}
        />
        <div className="tab-content border-t border-t-base-300 bg-base-100 py-10">
          <div className="grid grid-cols-1 md: grid-cols-2 lg: grid-cols-4 gap-6">
            {(blogs || []).slice(0, 8).map((blog) => (
              <Card key={blog.id} id={blog.id} coverImage={blog.coverImage} title={blog.title} type={blog.type} />
            ))}
          </div>
          <div className="mt-8 text-center lg:text-end">
            <button className="text-primary">
              Lihat Semua <MoveRight className="inline-block size-4 ml-1" />
            </button>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          className="tab hidden md:block checked:border-b-primary hover:text-primary text-[16px] checked:border-b"
          aria-label="Pengumuman"
          onChange={() => setActiveTab("Pengumuman")}
        />
        <div className="tab-content border-t border-t-base-300 bg-base-100 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(blogs || []).slice(0, 8).map((blog) => (
              <Card key={blog.id} id={blog.id} coverImage={blog.coverImage} title={blog.title} type={blog. type} />
            ))}
          </div>
          <div className="mt-8 text-center lg:text-end">
            <button className="text-primary">
              Lihat Semua <MoveRight className="inline-block size-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
