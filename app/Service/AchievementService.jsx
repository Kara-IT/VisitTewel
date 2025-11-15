import axios from "axios";
const BaseURL = process.env.NEXT_PUBLIC_API_URL;

const AchievementService = {
  async fetchAchievements(page, pageSize, search = "") {
    const response = await axios.get(`${BaseURL}/achievements/public?page=${page}&page_size=${pageSize}&search=${search}`);
    return response.data;
  },
};

export default AchievementService;
