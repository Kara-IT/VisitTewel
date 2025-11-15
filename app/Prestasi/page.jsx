"use client";
import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import AchievementService from "../Service/AchievementService";

export default function Page() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const PAGE_SIZE = 10;

  const handleOpenFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const fetchAchievements = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const response = await AchievementService.fetchAchievements(page, PAGE_SIZE, search);
      console.log("API Response:", response);

      const transformedData = (response.data || []).map((achievement) => ({
        nama: achievement.title,
        tanggal: achievement.achieved_on.split('-').reverse().join('-'),
        action: {
          text: "Lihat",
          onClick: () => handleOpenFile(achievement.file),
        },
      }));

      setAchievements(transformedData);

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
      console.error("Error fetching achievements:", error);
      setAchievements([]);
      setTotalPages(1);
      setTotalData(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements("", 1);
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchAchievements(searchTerm, 1);
    }
  };

  const handlePageChange = (page) => {
    fetchAchievements(searchTerm, page);
  };

  const columns = [
    { header: "Nama Prestasi", key: "nama" },
    { header: "Tanggal", key: "tanggal" },
    { header: "Action", key: "action" },
  ];

  return (
    <Table
      title="Prestasi"
      subtitle={`Prestasi · ${totalData} Data · Pencapaian Desa`}
      searchPlaceholder="Cari prestasi..."
      data={achievements}
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
