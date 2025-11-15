'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Table from "../Components/Table2";
import { PembangunanService } from "../Service/PembangunanService";

export default function page() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDevelopmentPlans();
  }, []);

  const fetchDevelopmentPlans = async (search = "") => {
    try {
      setLoading(true);
      const result = await PembangunanService.getAllDevelopmentPlans(1, 10, search);
      if (result.data && Array.isArray(result.data)) {
        const formattedData = PembangunanService.formatDataForTable(result.data);
        setData(formattedData);
      }
    } catch (error) {
      console.error("Error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchDevelopmentPlans(searchTerm);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    fetchDevelopmentPlans("");
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
        subtitle={`Proyek · ${data.length} Data · Infrastruktur Desa`}
        searchPlaceholder="Cari proyek pembangunan..."
        data={data}
        columns={columns}
        loading={loading}
        onActionClick={handleActionClick}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchKeyDown={handleSearch}
        onClearSearch={handleClearSearch}
      />
    </>
  );
}
