// SLICES
import { setTgHashReducer, setSelectedOptionReducer } from "./common.slice";
// UTILS
import { generateTgHash } from "utils/helper-functions";

export const setTgHash = () => (dispatch) => {
  const hash = JSON.stringify(generateTgHash());
  dispatch(setTgHashReducer(hash));
};

export const setSelectedOption = (payload) => (dispatch) => {
  dispatch(setSelectedOptionReducer(payload));
};
