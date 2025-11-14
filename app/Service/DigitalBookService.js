const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const getDigitalBooks = async (page = 1, pageSize = 12, search = "") => {
  try {
    const params = new URLSearchParams({
      page,
      page_size: pageSize,
      search,
    });
    const response = await fetch(
      `${BASE_URL}/digital-books/public?${params.toString()}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching digital books:", error);
    throw error;
  }
};
