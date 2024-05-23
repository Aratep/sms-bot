import { toast } from "react-toastify";

// CONSTANTS
import { API_URL } from "./constants";

export const getActiveItem = (routes, path) => !!routes.includes(path);

export function generateTgHash() {
  const WebApp = window.Telegram.WebApp;
  let initDataURLSP = new URLSearchParams(WebApp.initData);
  const hash = initDataURLSP.get("hash");

  initDataURLSP.delete("hash");
  initDataURLSP.sort();
  const checkDataString = initDataURLSP.toString().replaceAll("&", "\n");

  return {
    hash: hash,
    checkDataString: checkDataString,
  };
}

export function notify(text, variant = "info", opts) {
  const defOptions = {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };
  const options = { ...defOptions, ...opts };

  return toast[variant](text, options);
}

export function generateList(list) {
  let res = [];
  list.length > 0 &&
  list.forEach((item) => {
    res.push({
      id: item.id,
      title: item.name,
      src: `${API_URL}${item.image_url}`,
    });
  });
  return res;
}
