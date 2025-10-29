"use client";
import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import AchievementService from "../Service/AchievementService";

export default function Page() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOpenFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await AchievementService.fetchAchievements(1, 10);
        const transformedData = response.data.map((achievement) => ({
          nama: achievement.title,
          tanggal: achievement.achieved_on.split('-').reverse().join('-'),
          action: {
            text: "Lihat",
            onClick: () => handleOpenFile(achievement.file),
          },
        }));
        setAchievements(transformedData);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const columns = [
    { header: "Nama Prestasi", key: "nama" },
    { header: "Tanggal", key: "tanggal" },
    { header: "Action", key: "action" },
  ];

  return (
    <Table
      title="Prestasi"
      subtitle={`Prestasi · ${achievements.length} Data · Pencapaian Desa`}
      searchPlaceholder="Cari prestasi..."
      data={achievements}
      columns={columns}
      loading={loading}
    />
  );
}
