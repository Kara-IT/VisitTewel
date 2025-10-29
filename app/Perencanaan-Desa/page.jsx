"use client";
import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import VillagePlanningService from "../Service/VillagePlanningService";

export default function Page() {
  const [plannings, setPlannings] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOpenFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  useEffect(() => {
    const fetchPlannings = async () => {
      try {
        const response = await VillagePlanningService.fetchVillagePlannings(1, 10);
        const transformedData = response.data.map((planning) => ({
          nama: planning.name,
          tahun: planning.planned_on.split('-').reverse()[0], // Get year from date
          deskripsi: planning.description,
          action: {
            text: "Lihat Detail",
            onClick: () => handleOpenFile(planning.file),
          },
        }));
        setPlannings(transformedData);
      } catch (error) {
        console.error("Error fetching plannings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlannings();
  }, []);

  const columns = [
    { header: "Nama Laporan", key: "nama" },
    { header: "Tahun", key: "tahun" },
    { header: "Deskripsi", key: "deskripsi" },
    { header: "Action", key: "action" },
  ];

  return (
    <Table
      title="Perencanaan Desa"
      subtitle={`Rencana · ${plannings.length} Data · Program Desa`}
      searchPlaceholder="Cari rencana pembangunan..."
      data={plannings}
      columns={columns}
      loading={loading}
    />
  );
}
