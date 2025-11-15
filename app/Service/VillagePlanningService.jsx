import axios from "axios";
const BaseURL = process.env.NEXT_PUBLIC_API_URL;

const VillagePlanningService = {
  async fetchVillagePlannings(page, pageSize, search = "") {
    const response = await axios.get(`${BaseURL}/village-plannings/public?page=${page}&page_size=${pageSize}&search=${search}`);
    return response.data;
  },
};

export default VillagePlanningService;
