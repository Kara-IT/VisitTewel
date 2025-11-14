"use client";
import { getVillageInfoById } from "@/app/Service/TourismService";
import { useEffect, useState, use } from "react";
import { MapPin, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function WisataDetail({ params }) {
  const { id } = use(params);
  const [wisata, setWisata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getVillageInfoById(id);
        if (data?.data) {
          setWisata(data.data);
          setError(null);
        } else {
          setError("Data tidak ditemukan");
        }
      } catch (err) {
        console.error("Error fetching wisata detail:", err);
        setError("Gagal memuat detail wisata");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Memuat detail wisata...</p>
        </div>
      </div>
    );
  }

  if (error || !wisata) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{error || "Data tidak ditemukan"}</p>
          <Link href="/wisata" className="text-primary hover:underline">
            Kembali ke daftar wisata
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="sticky top-0 z-1 bg-white border-b border-gray-100">
        <div className="mt-28 lg:mt-40 container mx-auto px-4 lg:px-10 py-4">
          <Link href="/wisata" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors">
            <ArrowLeft size={20} />
            Kembali
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-10 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Image */}
          {wisata.tourism_image && (
            <div className="mb-12 rounded-lg overflow-hidden shadow-sm">
              <img
                src={wisata.tourism_image}
                alt={wisata.title}
                className="w-full h-[350px] lg:h-[450px] object-cover"
              />
            </div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Title & Meta */}
              <div className="mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {wisata.title}
                </h1>
                
                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                    {wisata.category}
                  </span>
                  {wisata.published_on && (
                    <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-2">
                      <Calendar size={16} />
                      {wisata.published_on}
                    </span>
                  )}
                  {wisata.tourism_valid && (
                    <span className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      ✓ Tersertifikasi
                    </span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-200 mb-8"></div>

              {/* Description */}
              {wisata.description && (
                <div className="prose prose-lg max-w-none text-gray-700 [&_p]:mb-4 [&_strong]:text-gray-900 [&_a]:text-primary [&_a]:hover:underline">
                  <div dangerouslySetInnerHTML={{ __html: wisata.description }} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-8 sticky top-48">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Informasi Wisata</h3>

                <div className="space-y-5 mb-8 text-sm">
                  {wisata.category && (
                    <div>
                      <p className="text-gray-500 font-medium mb-1">Kategori</p>
                      <p className="text-gray-900">{wisata.category}</p>
                    </div>
                  )}

                  {wisata.published_on && (
                    <div>
                      <p className="text-gray-500 font-medium mb-1">Dipublikasikan</p>
                      <p className="text-gray-900">{wisata.published_on}</p>
                    </div>
                  )}

                  {wisata.tourism_valid && (
                    <div>
                      <p className="text-gray-500 font-medium mb-1">Status</p>
                      <p className="text-green-600 font-medium">Wisata Tersertifikasi</p>
                    </div>
                  )}
                </div>

                {/* Location Button */}
                {wisata.location_link && (
                  <a
                    href={wisata.location_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium text-center"
                  >
                    <MapPin size={20} />
                    Buka di Maps
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
