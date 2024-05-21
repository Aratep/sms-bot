import axios from "axios";

// CONSTANTS
import { API } from "utils/constants";

export const countriesAPI = {
  fetchCountries: (name) => axios.post(`${API}/countries`, { name }),
  // fetchNodeContent: nodeId => axios.get(`https://mokback.onrender.com/node_content/${nodeId}`),
};
