import axios from "axios";
const BaseURL = process.env.NEXT_PUBLIC_API_URL;

const FinancialService = {

// fetch all finance reports
    async fetchFinanceReport(page, pageSize, search = "") {
    const response = await axios.get(`${BaseURL}/financial-reports/public?page=${page}&page_size=${pageSize}&search=${search}`);
    return response.data;
  },

};

export default FinancialService;