"use client";
import { useEffect, useState } from "react";
import { getVillageInfos } from "../Service/TourismService";
import Card from "../Components/Card2";
import Link from "next/link";

export default function WisataList() {
  const [wisataData, setWisataData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVillageInfos(page, 12);
      if (data?.data) {
        setWisataData(data.data);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Semua Destinasi Wisata</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wisataData.map((item) => (
          <Link key={item.id} href={`/wisata/${item.id}`}>
            <Card
              image={item.tourism_image}
              category={item.category}
              title={item.title}
            />
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
