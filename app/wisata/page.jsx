"use client";
import { useEffect, useState } from "react";
import { getVillageInfos } from "../Service/TourismService";
import Card from "../Components/Card2";
import Link from "next/link";

export default function WisataList() {
  const [wisataData, setWisataData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getVillageInfos(page, 12);
        if (data?.data) {
          // Filter data: jika category religi, hanya tampilkan yang tourism_valid true
          const filteredData = data.data.filter((item) => {
            if (item.category?.toLowerCase() === "religi") {
              return item.tourism_valid === true;
            }
            return true;
          });
          setWisataData(filteredData);
          setTotalPages(data.pagination?.total_pages || 1);
        }
      } catch (error) {
        console.error("Error fetching wisata data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="min-h-screen">
      <div className="mt-28 pb-16 lg:mt-40 container mx-auto px-4 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
            Semua Destinasi Wisata
          </h1>
          <p className="text-gray-600 text-lg">
            Jelajahi berbagai destinasi wisata menarik di Desa Ketewel
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Memuat destinasi wisata...</p>
            </div>
          </div>
        ) : wisataData.length > 0 ? (
          <>
            {/* Grid Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base"
              >
                ← Sebelumnya
              </button>
              
              <span className="text-gray-700 font-medium text-sm sm:text-base whitespace-nowrap">
                Hal. <span className="font-bold">{page}</span>/{totalPages}
              </span>
              
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base"
              >
                Selanjutnya →
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Tidak ada destinasi wisata ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
