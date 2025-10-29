"use client";
import { getVillageInfoById } from "@/app/Service/TourismService";
import { useEffect, useState } from "react";

export default function WisataDetail({ params }) {
  const [wisata, setWisata] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getVillageInfoById(params.id);
      if (data) {
        setWisata(data);
      }
    };
    fetchData();
  }, [params.id]);

  if (!wisata) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <img
          src={wisata.image_url}
          alt={wisata.title}
          className="w-full h-[400px] object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{wisata.title}</h1>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full inline-block mb-4">
          {wisata.category}
        </div>
        <div className="prose max-w-none">
          {wisata.description}
        </div>
      </div>
    </div>
  );
}
