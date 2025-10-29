"use client";
import Tab from "@/app/Components/Tab";
import React, { useEffect, useState } from "react";
import BlogService from "@/app/Service/BlogService";

export default function KabarKetewel() {

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await BlogService.fetchBlogs(1, 1);
      } catch (error) {
        console.error("Error fetching blogs:", error);
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
      <Tab />
    </div>
  );
}
