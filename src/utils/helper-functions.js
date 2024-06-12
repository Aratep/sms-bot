import { toast } from "react-toastify";
import { nanoid } from "nanoid";

// CONSTANTS
import { API_URL } from "./constants";
// IMAGES
import defaultAvatar from "assets/imgs/settings/profile-default.svg";

export const getActiveItem = (routes, path) => !!routes.includes(path);

export function generateTgHash() {
  const WebApp = window.Telegram.WebApp;
  let initDataURLSP = new URLSearchParams(WebApp.initData);
  const hash = initDataURLSP.get("hash");

  initDataURLSP.delete("hash");
  initDataURLSP.sort();
  const checkDataString = initDataURLSP.toString().replaceAll("&", "\\n");

  return {
    hash: hash,
    checkDataString: checkDataString,
  };
}

export function notify(text, variant = "info", opts) {
  const defOptions = {
    position: "top-center",
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

export function generateOrderOptions(data) {
  const options = Object.values(data);
  let res = [];
  options.length > 0 &&
    options.forEach((item, idx) => {
      res.push({
        id: idx,
        title: item.value,
        src: item.src,
      });
    });
  return res;
}

export function formatUserData(data) {
  const newData = { ...data };

  data?.first_name || data?.last_name
    ? (newData.name = `${data.first_name} ${data.last_name}`)
    : (newData.name = "--");
  data?.image_url !== ""
    ? (newData.image_url = data?.image_url)
    : (newData.image_url = defaultAvatar);
  data?.username ? (newData.username = `${data?.username}`) : "--";

  return newData;
}

export function generateOrders(orders) {
  const formattedOrders = [];

  orders.forEach((order) => {
    formattedOrders.push({
      id: nanoid(),
      src: `${API_URL}${order?.country?.image_url}`,
      title: formatPhone(order?.phone),
      date: formatDate(order?.date),
    });
  });

  return formattedOrders;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();
  const hour = date.getUTCHours().toString().padStart(2, "0");
  const minute = date.getUTCMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}.${month}.${year} ${hour}:${minute}`;

  return formattedDate;
}

function formatPhone(phoneStr) {
  const formattedPhone = `+ ${phoneStr}`;
  return formattedPhone;
}
