import axios from "axios";

// CONSTANTS
import { API } from "utils/constants";

export const smsAPI = {
  fetchCountries: (params) =>
    axios.post(`${API}/countries/list`, { ...params }),
  fetchServices: (params) => axios.post(`${API}/services/list`, { ...params }),
  fetchPrice: (params) => axios.post(`${API}/order/price`, { ...params }),
  fetchUser: (params) => axios.post(`${API}/user/get`, { ...params }),
  fetchUserOrders: (params) => axios.post(`${API}/order/list`, { ...params }),
  fetchOrderCreate: (params) =>
    axios.post(`${API}/order/create`, { ...params }),
  fetchOrderGet: (params, signal) =>
    axios.post(`${API}/order/get`, { ...params, signal }),
  fetchOrderCancel: (params) =>
    axios.post(`${API}/order/cancel`, { ...params }),
  fetchSecondCode: (params) =>
    axios.post(`${API}/order/create-second`, { ...params }),
  fetchCreateInvoice: (params) =>
    axios.post(`${API}/create-invoice`, { ...params }),
};
