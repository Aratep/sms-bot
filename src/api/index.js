import axios from "axios";

// CONSTANTS
import { API } from "utils/constants";

export const smAPI = {
  fetchCountries: (name) => axios.post(`${API}/countries/list`, { name }),
  fetchServices: (name) => axios.post(`${API}/services/list`, { name }),
};
