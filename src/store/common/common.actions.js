// SLICES
import {
  setTgHashReducer,
  setSelectedOptionReducer,
  resetSelectedOptionReducer,
  setIsOrderDoneReducer,
  setIsTimerEndReducer,
} from "./common.slice";
// UTILS
import { generateTgHash } from "utils/helper-functions";

export const setTgHash = () => (dispatch) => {
  const prodHash = generateTgHash();
  const devHash = {
    hash: "FAKE_4541f159cbb58f8a02b35c372dd228f5f352e25618b1fb004349608f7ceefef3",
    checkDataString:
      "auth_date=1719463198\\nquery_id=AAHWXEgiAAAAANZcSCISw6rm\\nuser=%7B%22id%22%3A575167702%2C%22first_name%22%3A%22Ara%22%2C%22last_name%22%3A%22Tepanyan%22%2C%22username%22%3A%22ara_tepanyan%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D",
  };
  let hash = process.env.NODE_ENV === "development" ? devHash : prodHash;
  if (prodHash.checkDataString === null || prodHash.hash === null) {
    hash = devHash;
  }

  dispatch(setTgHashReducer(hash));
};

export const setSelectedOption = (payload) => (dispatch) => {
  dispatch(setSelectedOptionReducer(payload));
};

export const resetSelectedOption = (payload) => (dispatch) => {
  dispatch(resetSelectedOptionReducer(payload));
};

export const setIsOrderDone = (payload) => (dispatch) => {
  dispatch(setIsOrderDoneReducer(payload));
};

export const setIsTimerEnd = (payload) => (dispatch) => {
  dispatch(setIsTimerEndReducer(payload));
};
