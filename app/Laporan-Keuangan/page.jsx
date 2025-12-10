"use client"

import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import PdfViewer from "../Components/PdfViewer";
import FinancialService from "../Service/FinancialService";

export default function Page() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [selectedReport, setSelectedReport] = useState(null);
  const PAGE_SIZE = 10;

  const handleOpenPdf = (report) => {
    setSelectedReport(report);
  };

  const handleClosePdf = () => {
    setSelectedReport(null);
  };

  const fetchReports = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const response = await FinancialService.fetchFinanceReport(page, PAGE_SIZE, search);
      
      if (!response?.data || response.data.length === 0) {
        throw new Error("Gagal memuat data laporan keuangan");
      }
      
      const transformedData = response.data.map(report => ({
        nama: report.title,
        tahun: report.year.toString(),
        deskripsi: report.description,
        action: {
          text: "Lihat Detail",
          onClick: () => handleOpenPdf({
            title: report.title,
            file: report.file
          })
        },
        file: report.file
      }));
      
      setReports(transformedData);
      
      let total = response.total || response.pagination?.total || response.meta?.total || 0;
      if (total === 0 && transformedData.length > 0) {
        total = transformedData.length === PAGE_SIZE ? PAGE_SIZE * page + PAGE_SIZE : transformedData.length + (PAGE_SIZE * (page - 1));
      }
      
      setTotalData(total);
      setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
      setCurrentPage(page);
      setError(null);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError(error?.message || "Gagal mengambil data laporan keuangan");
      setReports([]);
      setTotalPages(1);
      setTotalData(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports("", 1);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchReports(searchTerm, 1);
    }
  };

  const handlePageChange = (page) => {
    fetchReports(searchTerm, page);
  };

  const columns = [
    { header: "Nama Laporan", key: "nama" },
    { header: "Tahun", key: "tahun" },
    { header: "Deskripsi", key: "deskripsi" },
    { header: "Action", key: "action" },
  ];

  return (
    <>
      <Table
        title="Laporan Keuangan"
        subtitle={`Inventaris · ${totalData} Data · Aset Desa`}
        searchPlaceholder="Cari laporan keuangan..."
        data={reports}
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
      {selectedReport && (
        <PdfViewer book={selectedReport} onClose={handleClosePdf} />
      )}
    </>
  );
}
