import axios from "axios";
const BaseURL = process.env.NEXT_PUBLIC_API_URL;

const RegulationService = {

// fetch all regulation reports
    async fetchRegulationReport(page, pageSize, search = "") {
    const response = await axios.get(`${BaseURL}/regulations/public?page=${page}&page_size=${pageSize}&search=${search}`);
    return response.data;
  },

};

export default RegulationService;