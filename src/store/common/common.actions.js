// SLICES
import { setTgHashReducer, setSelectedOptionReducer } from "./common.slice";
// UTILS
import { generateTgHash } from "utils/helper-functions";

export const setTgHash = () => (dispatch) => {
  const prodHash = generateTgHash();
  const devHash = {
    hash: "87046c320d1asdfasfb87b16d52885e1231c2312sfdfdsdfb919292e511e3bbb5asdfasdf1f1e4d8ee0",
    checkDataString:
      "auth_date=1716286077\\nquery_id=AAHWXEgiAAAAANZcSCIgA3eQ\\nuser=%7B%22id%22%3A575167702%2C%22first_name%22%3A%22Ara%22%2C%22last_name%22%3A%22Tepanyan%22%2C%22username%22%3A%22ara_tepanyan%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D",
  };
  const hash = process.env.NODE_ENV === "development" ? devHash : prodHash;

  dispatch(setTgHashReducer(devHash));
};

export const setSelectedOption = (payload) => (dispatch) => {
  dispatch(setSelectedOptionReducer(payload));
};
