import axios from "axios";

// CONSTANTS
import { API } from "utils/constants";

export const smsAPI = {
  fetchCountries: (params) =>
    axios.post(`${API}/countries/list`, { ...params }),
  fetchServices: (params) => axios.post(`${API}/services/list`, { ...params }),
  fetchPrice: (params) => axios.post(`${API}/order/price`, { ...params }),
  fetchOrder: (params) => axios.post(`${API}/order`, { ...params }),
  fetchUser: (params) => axios.post(`${API}/user/get`, { ...params }),
  fetchUserOrders: (params) => axios.post(`${API}/order/list`, { ...params }),
};
