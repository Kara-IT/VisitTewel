"use client";
import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import PdfViewer from "../Components/PdfViewer";
import RegulationService from "../Service/RegulationService";

export default function Page() {
  const [regulations, setRegulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [selectedRegulation, setSelectedRegulation] = useState(null);
  const PAGE_SIZE = 10;

  const handleOpenPdf = (regulation) => {
    setSelectedRegulation(regulation);
  };

  const handleClosePdf = () => {
    setSelectedRegulation(null);
  };

  const fetchRegulations = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const response = await RegulationService.fetchRegulationReport(page, PAGE_SIZE, search);

      if (!response?.data || response.data.length === 0) {
        throw new Error("Gagal memuat data regulasi desa");
      }

      const transformedData = response.data.map((regulation) => ({
        nama: regulation.title,
        tanggal: new Date(regulation.issued_on).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        nomor: regulation.regulation_number,
        action: {
          text: "Lihat",
          onClick: () => handleOpenPdf({
            title: regulation.title,
            file: regulation.file
          }),
        },
      }));

      setRegulations(transformedData);

      let total = response.total || response.pagination?.total || response.meta?.total || 0;
      if (total === 0 && transformedData.length > 0) {
        total = transformedData.length === PAGE_SIZE ? PAGE_SIZE * page + PAGE_SIZE : transformedData.length + (PAGE_SIZE * (page - 1));
      }

      setTotalData(total);
      setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
      setCurrentPage(page);
      setError(null);
    } catch (error) {
      console.error("Error fetching regulations:", error);
      setError(error?.message || "Gagal mengambil data regulasi desa");
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
    <>
      <Table
        title="Regulasi Desa"
        subtitle={`Peraturan · ${totalData} Data · Kebijakan Desa`}
        searchPlaceholder="Cari regulasi desa..."
        data={regulations}
        columns={columns}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchKeyDown={handleSearch}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedRegulation && (
        <PdfViewer book={selectedRegulation} onClose={handleClosePdf} />
      )}
    </>
  );
}
