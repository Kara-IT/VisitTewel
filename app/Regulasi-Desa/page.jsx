"use client";
import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import RegulationService from "../Service/RegulationService";

export default function Page() {
  const [regulations, setRegulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const PAGE_SIZE = 10;

  const handleOpenFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const fetchRegulations = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const response = await RegulationService.fetchRegulationReport(page, PAGE_SIZE, search);
      console.log("API Response:", response);

      const transformedData = (response.data || []).map((regulation) => ({
        nama: regulation.title,
        tanggal: new Date(regulation.issued_on).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        nomor: regulation.regulation_number,
        action: {
          text: "Lihat",
          onClick: () => handleOpenFile(regulation.file),
        },
      }));

      setRegulations(transformedData);

      // Calculate totalPages dari berbagai kemungkinan response structure
      let total = response.total || response.pagination?.total || response.meta?.total || 0;

      // Jika total masih 0, gunakan panjang data sebagai indikator
      if (total === 0 && transformedData.length > 0) {
        total = transformedData.length === PAGE_SIZE ? PAGE_SIZE * page + PAGE_SIZE : transformedData.length + (PAGE_SIZE * (page - 1));
      }

      setTotalData(total);
      setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching regulations:", error);
      setRegulations([]);
      setTotalPages(1);
      setTotalData(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegulations("", 1);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchRegulations(searchTerm, 1);
    }
  };

  const handlePageChange = (page) => {
    fetchRegulations(searchTerm, page);
  };

  const columns = [
    { header: "Nama Regulasi", key: "nama" },
    { header: "Tanggal", key: "tanggal" },
    { header: "Nomor", key: "nomor" },
    { header: "Action", key: "action" },
  ];

  return (
    <Table
      title="Regulasi Desa"
      subtitle={`Peraturan · ${totalData} Data · Kebijakan Desa`}
      searchPlaceholder="Cari regulasi desa..."
      data={regulations}
      columns={columns}
      loading={loading}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onSearchKeyDown={handleSearch}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
