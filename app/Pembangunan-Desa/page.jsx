'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "../Components/Table2";
import { PembangunanService } from "../Service/PembangunanService";

export default function page() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const PAGE_SIZE = 10;

  useEffect(() => {
    fetchDevelopmentPlans("", 1);
  }, []);

  const fetchDevelopmentPlans = async (search = "", page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const result = await PembangunanService.getAllDevelopmentPlans(page, PAGE_SIZE, search);

      if (!result?.data || result.data.length === 0) {
        throw new Error("Gagal memuat data pembangunan desa");
      }

      const formattedData = PembangunanService.formatDataForTable(result.data);
      setData(formattedData);

      let total = result.total || result.pagination?.total || result.meta?.total || 0;
      if (total === 0 && formattedData.length > 0) {
        total = formattedData.length === PAGE_SIZE ? PAGE_SIZE * page + PAGE_SIZE : formattedData.length + (PAGE_SIZE * (page - 1));
      }

      setTotalData(total);
      setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error:", error);
      setError(error?.message || "Gagal mengambil data pembangunan desa");
      setData([]);
      setTotalPages(1);
      setTotalData(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchDevelopmentPlans(searchTerm, 1);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchDevelopmentPlans("", 1);
  };

  const handlePageChange = (page) => {
    fetchDevelopmentPlans(searchTerm, page);
  };

  const columns = [
    { header: "Nama Proyek", key: "regulasi" },
    { header: "Tahun", key: "tahun" },
    { header: "Alamat", key: "alamat" },
    { header: "Sumber Dana", key: "sumber_dana" },
    { header: "Anggaran", key: "anggaran" },
    { header: "Action", key: "action" },
  ];

  const handleActionClick = (row) => {
    if (row.id) {
      router.push(`/Pembangunan-Desa/${row.id}`);
    }
  };

  return (
    <>
      <Table
        title="Pembangunan Desa"
        subtitle={`Proyek · ${totalData} Data · Infrastruktur Desa`}
        searchPlaceholder="Cari proyek pembangunan..."
        data={data}
        columns={columns}
        loading={loading}
        error={error}
        onActionClick={handleActionClick}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchKeyDown={handleSearch}
        onClearSearch={handleClearSearch}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
