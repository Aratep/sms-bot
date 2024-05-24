import axios from "axios";

// CONSTANTS
import { API } from "utils/constants";

export const smsAPI = {
  fetchCountries: (name) => axios.post(`${API}/countries/list`, { name }),
  fetchServices: (name) => axios.post(`${API}/services/list`, { name }),
  fetchPrice: (params) => axios.post(`${API}/order/price`, { ...params }),
  fetchOrder: (params) => axios.post(`${API}/order`, { ...params }),
};
