"use client";
import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import RegulationService from "../Service/RegulationService";

export default function Page() {
  const [regulations, setRegulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const fetchRegulations = async (search = "") => {
    setLoading(true);
    try {
      const response = await RegulationService.fetchRegulationReport(1, 10, search);
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
    } catch (error) {
      console.error("Error fetching regulations:", error);
      setRegulations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegulations();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchRegulations(searchTerm);
    }
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
      subtitle={`Peraturan · ${regulations.length} Data · Kebijakan Desa`}
      searchPlaceholder="Cari regulasi desa..."
      data={regulations}
      columns={columns}
      loading={loading}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      onSearchKeyDown={handleSearch}
    />
  );
}
