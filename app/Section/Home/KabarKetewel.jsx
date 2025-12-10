"use client";
import Tab from "@/app/Components/Tab";
import React, { useEffect, useState } from "react";
import BlogService from "@/app/Service/BlogService";

export default function KabarKetewel() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await BlogService.fetchBlogs(1, 1);
        setBlogs(response || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-xl lg:text-3xl text-gray-400">
          <span className="text-primary font-medium">Kabar Ketewel </span>
          berita telah membawa cerita, budaya, dan berita terbaru seputar
          tradisi, wisata, dan perkembangan Desa Ketewel
        </h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <p className="text-gray-500">Memuat berita...</p>
        </div>
      ) : (
        <Tab blogs={blogs} />
      )}
    </div>
  );
}
