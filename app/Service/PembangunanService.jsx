const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const PembangunanService = {
  // Fetch semua data pembangunan dengan pagination
  async getAllDevelopmentPlans(page = 1, pageSize = 10, search = "") {
    try {
      let url = `${BASE_URL}/development-plans/public?page=${page}&page_size=${pageSize}`;
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      return await response.json();
    } catch (error) {
      console.error("Error fetching development plans:", error);
      throw error;
    }
  },

  // Fetch detail pembangunan berdasarkan ID
  async getDevelopmentPlanById(id) {
    try {
      const response = await fetch(`${BASE_URL}/development-plans/public/${id}`);
      if (!response.ok) throw new Error("Failed to fetch detail");
      return await response.json();
    } catch (error) {
      console.error("Error fetching development plan detail:", error);
      throw error;
    }
  },

  // Format data untuk tabel
  formatDataForTable(items) {
    return items.map((item) => ({
      id: item.id,
      regulasi: item.name,
      tahun: item.start_date || '-',
      alamat: item.address || '-',
      sumber_dana: item.funding_source || '-',
      anggaran: item.budget ? new Intl.NumberFormat("id-ID").format(Math.round(item.budget)) : '0',
      action: "Lihat Detail",
    }));
  },

  // Format currency
  formatCurrency(amount) {
    if (!amount) return 'Rp 0';
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(amount));
  },

  // Format date
  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  },
};
