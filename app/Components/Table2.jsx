"use client";

import { Search } from "lucide-react";

export default function Table({
  title = "Data",
  subtitle = "Data · 0 Items",
  searchPlaceholder = "Cari...",
  data = [],
  columns = [],
  loading = false,
  onActionClick = null,
  searchTerm = "",
  onSearchChange = () => {},
  onSearchKeyDown = () => {},
  onClearSearch = () => {},
}) {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 mt-28 lg:mt-38">
        <h1 className="text-center font-semibold text-3xl lg:text-4xl text-primary">
          {title}
        </h1>
        <p className="text-center lg:text-base text-sm text-gray-500 mt-2">
          {subtitle}
        </p>
        <div className="mt-10 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={onSearchKeyDown}
            className="input w-full border-gray-200 focus-within:shadow-none focus-within:outline-none pl-10"
          />
        </div>
        <div className="mt-4 overflow-x-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                {searchTerm ? `Tidak ada hasil pencarian untuk "${searchTerm}"` : "Tidak ada data"}
              </p>
              {searchTerm && (
                <button
                  onClick={onClearSearch}
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
                >
                  Hapus Filter Pencarian
                </button>
              )}
            </div>
          ) : (
            <table className="table w-full border border-gray-200">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 border-r border-gray-200 text-left text-xs font-medium text-primary uppercase tracking-wider border-b"
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`px-6 py-4 border-r border-gray-200 text-sm ${
                          column.key === "action"
                            ? "text-primary underline whitespace-nowrap font-medium"
                            : column.key === "deskripsi" ||
                              column.key === "keterangan"
                            ? "text-gray-500 max-w-[500px]"
                            : colIndex === 0
                            ? "whitespace-nowrap font-medium text-gray-900"
                            : "whitespace-nowrap text-gray-500"
                        }`}
                      >
                        {column.key === "action" ? (
                          <button
                            onClick={() => onActionClick && onActionClick(row)}
                            className="text-primary hover:underline cursor-pointer transition-colors"
                          >
                            {row[column.key]}
                          </button>
                        ) : column.key === "deskripsi" ||
                          column.key === "keterangan" ? (
                          <div className="truncate" title={row[column.key]}>
                            {row[column.key]}
                          </div>
                        ) : (
                          row[column.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
