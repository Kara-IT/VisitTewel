"use client"

import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import FinancialService from "../Service/FinancialService";

export default function Page() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenFile = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const fetchReports = async (search = "") => {
    setLoading(true);
    try {
      const response = await FinancialService.fetchFinanceReport(1, 10, search);
      const transformedData = (response.data || []).map(report => ({
        nama: report.title,
        tahun: report.year.toString(),
        deskripsi: report.description,
        action: {
          text: "Lihat Detail",
          onClick: () => handleOpenFile(report.file)
        },
        file: report.file
      }));
      setReports(transformedData);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchReports(searchTerm);
    }
  };

  const columns = [
    { header: "Nama Laporan", key: "nama" },
    { header: "Tahun", key: "tahun" },
    { header: "Deskripsi", key: "deskripsi" },
    { header: "Action", key: "action" },
  ];

  return (
    <Table
      title="Laporan Keuangan"
      subtitle={`Inventaris · ${reports.length} Data · Aset Desa`}
      searchPlaceholder="Cari laporan keuangan..."
      data={reports}
      columns={columns}
      loading={loading}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onSearchKeyDown={handleSearch}
    />
  );
}
