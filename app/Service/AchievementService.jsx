import axios from "axios";
const BaseURL = process.env.NEXT_PUBLIC_API_URL;

const AchievementService = {
  async fetchAchievements(page, pageSize) {
    const response = await axios.get(`${BaseURL}/achievements/public?page=${page}&page_size=${pageSize}`);
    return response.data;
  },
};

export default AchievementService;
