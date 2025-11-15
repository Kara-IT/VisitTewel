"use client";
import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import VillagePlanningService from "../Service/VillagePlanningService";

export default function Page() {
  const [plannings, setPlannings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const PAGE_SIZE = 10;

  const handleOpenFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const fetchPlannings = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const response = await VillagePlanningService.fetchVillagePlannings(page, PAGE_SIZE, search);
      console.log("API Response:", response);

      const transformedData = (response.data || []).map((planning) => ({
        nama: planning.name,
        tahun: planning.planned_on.split('-').reverse()[0],
        deskripsi: planning.description,
        action: {
          text: "Lihat Detail",
          onClick: () => handleOpenFile(planning.file),
        },
      }));

      setPlannings(transformedData);

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
      console.error("Error fetching plannings:", error);
      setPlannings([]);
      setTotalPages(1);
      setTotalData(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlannings("", 1);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchPlannings(searchTerm, 1);
    }
  };

  const handlePageChange = (page) => {
    fetchPlannings(searchTerm, page);
  };

  const columns = [
    { header: "Nama Laporan", key: "nama" },
    { header: "Tahun", key: "tahun" },
    { header: "Deskripsi", key: "deskripsi" },
    { header: "Action", key: "action" },
  ];

  return (
    <Table
      title="Perencanaan Desa"
      subtitle={`Rencana · ${totalData} Data · Program Desa`}
      searchPlaceholder="Cari rencana pembangunan..."
      data={plannings}
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
