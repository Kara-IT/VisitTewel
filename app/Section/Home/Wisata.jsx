"use client";
import React, { useEffect, useState } from "react";
import Card from "../../Components/Card2";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { getVillageInfos } from "@/app/Service/TourismService";
import Link from "next/link";

export default function Wisata() {
  const [wisataData, setWisataData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVillageInfos(1, 4);
      if (data?.data) {
        setWisataData(data.data);
      }
    };
    fetchData();
  }, []);

  const scrollCarousel = (direction) => {
    const carousel = document.getElementById("carousel");
    carousel.scrollBy({ left: direction * 400, behavior: "smooth" });
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl text-center lg:text-start lg:text-3xl text-primary font-medium mb-1">
              Beragam Kawasan Wisata
            </h2>
            <p className="text-gray-600 text-center lg:text-start lg:text-base text-sm">
              Setiap Sudut, Punya Cerita — Temukan keindahan dan kearifan lokal
              Desa Ketewel dalam perjalanan yang tak terlupakan.
            </p>
          </div>

          <div className="lg:flex gap-2 hidden">
            <button
              onClick={() => scrollCarousel(-1)}
              className="p-3 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => scrollCarousel(1)}
              className="p-3 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div
          id="carousel"
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {wisataData.map((item) => (
            <Link
              key={item.id}
              href={`/wisata/${item.id}`}
              className="flex-shrink-0 w-[560px]"
            >
              <Card
                image={item.tourism_image}
                category={item.category}
                title={item.title}
              />
            </Link>
          ))}
        </div>
        <div className="text-center lg:text-end mt-6">
          <Link href="/wisata" className="text-primary">
            Lihat Semua <MoveRight className="size-4 ml-1 inline-block" />
          </Link>
        </div>
      </div>
    </div>
  );
}
