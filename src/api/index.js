import axios from "axios";

// CONSTANTS
import { API } from "utils/constants";

export const countriesAPI = {
  fetchCountries: (name) =>
    axios.post(
      `${API}/countries/list`,
      { name },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "*",
        },
      }
    ),
  // fetchNodeContent: nodeId => axios.get(`https://mokback.onrender.com/node_content/${nodeId}`),
};
