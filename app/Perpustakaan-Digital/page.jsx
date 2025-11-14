"use client";
import { useEffect, useState } from "react";
import { getDigitalBooks } from "../Service/DigitalBookService";
import { X, Eye, Calendar } from "lucide-react";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("../Components/PdfViewer"), {
  ssr: false,
});

export default function PerpustakaanDigital() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getDigitalBooks(page, 12, search);
        if (data?.data) {
          setBooks(data.data);
          setTotalPages(data.pagination?.total_pages || 1);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput);
  };

  const formatDate = (year, month, day) => {
    if (!year) return "-";
    if (month && day) {
      return new Date(year, month - 1, day).toLocaleDateString("id-ID");
    }
    if (month) {
      return `${new Date(year, month - 1).toLocaleDateString("id-ID", {
        month: "long",
        year: "numeric",
      })}`;
    }
    return year;
  };

  return (
    <div className="min-h-screen">
      <div className="mt-28 pb-16 lg:mt-40 container mx-auto px-4 lg:px-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
            Perpustakaan Digital
          </h1>
          <p className="text-gray-600 text-lg">
            Akses koleksi buku digital Desa Ketewel
          </p>
        </div>

        {/* Search Bar
        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Cari judul buku..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Cari
            </button>
          </div>
        </form> */}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Memuat buku digital...</p>
            </div>
          </div>
        ) : books.length > 0 ? (
          <>
            {/* Grid Books */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {books.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Book Cover Placeholder */}
                  <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center relative group">
                    <div className="text-center px-4">
                      <div className="text-3xl font-bold text-primary mb-2 line-clamp-3">
                        {book.title}
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Eye size={32} className="text-white" />
                    </button>
                  </div>

                  {/* Book Info */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {book.title}
                    </h3>

                    {/* Date */}
                    {book.year && (
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                        <Calendar size={16} />
                        <span>{formatDate(book.year, book.month, book.day)}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-1">
                      {book.description || "Tidak ada deskripsi"}
                    </p>

                    {/* Read Button */}
                    <button
                      onClick={() => setSelectedBook(book)}
                      className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                    >
                      Baca Buku
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base"
                >
                  ← Sebelumnya
                </button>

                <span className="text-gray-700 font-medium text-sm sm:text-base whitespace-nowrap">
                  Hal.{" "}
                  <span className="font-bold">{page}</span>/{totalPages}
                </span>

                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= totalPages}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base"
                >
                  Selanjutnya →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              Tidak ada buku digital ditemukan
            </p>
          </div>
        )}
      </div>

      {/* PDF Viewer Modal */}
      {selectedBook && (
        <PdfViewer book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
