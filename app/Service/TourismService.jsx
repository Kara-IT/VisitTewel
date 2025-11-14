const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://your-api-base-url';

// Village Info Services
export const getVillageInfos = async (page = 1, pageSize = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/village_infos/public?page=${page}&page_size=${pageSize}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching village infos:', error);
    return null;
  }
};

export const getVillageInfoById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/village_infos/public/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching village info:', error);
    return null;
  }
};
