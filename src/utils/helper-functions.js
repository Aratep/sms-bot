import { toast } from "react-toastify";
import { nanoid } from "nanoid";

// CONSTANTS
import { API_URL } from "./constants";
// IMAGES
import defaultAvatar from "assets/imgs/header-logo.png";

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
    autoClose: 5000,
    hideProgressBar: true,
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
        from: item?.price?.toString(),
      });
    });
  return res;
}

export function getLocalStorageValue(s) {
  return localStorage.getItem(s);
}

export function resetCounter(counter, name, setDateCounterValue) {
  const newDate = Date.now();
  const newDelay = counter;
  localStorage.setItem(name, JSON.stringify(newDate + newDelay));
  setDateCounterValue({ date: newDate, delay: newDelay });
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
        price: item.price,
      });
    });
  return res;
}

export function formatUserData(data) {
  const newData = { ...data };

  data?.first_name || data?.last_name
    ? (newData.name = `${data.first_name || ""} ${data.last_name || ""}`)
    : (newData.name = "--");
  data?.image_url !== ""
    ? (newData.image_url = data?.image_url)
    : (newData.image_url = defaultAvatar);
  data?.username ? (newData.username = `${data?.username}`) : "--";
  newData.balance = formatNumberToString(data?.balance);

  return newData;
}

export function formatTopUpNumber(str) {
  const numArr = str.split(".");
  return [numArr[0], numArr[1]];
}

export function generateOrders(orders) {
  const formattedOrders = [];

  orders.forEach((order) => {
    formattedOrders.push({
      id: nanoid(),
      src: `${API_URL}${order?.country?.image_url}`,
      title: formatPhone(order?.phone),
      date: formatDate(order?.date),
      firstCode: order?.first_code,
      secondCode: order?.second_code,
    });
  });

  return formattedOrders;
}

export function resetTimerToZero(timer) {
  localStorage.removeItem(timer);
}

export const openExternalLink2 = (url) => {
  // Create an anchor element
  const anchor = document.createElement("a");
  // Set the href attribute to the external link
  anchor.href = url;
  // Set the target to _blank to open in a new tab
  anchor.target = "_blank";
  // Add rel attribute for security reasons
  anchor.rel = "noopener noreferrer";
  // Append the anchor to the body
  document.body.appendChild(anchor);
  // Programmatically click the anchor to trigger the navigation
  anchor.click();
  // Remove the anchor from the DOM after clicking
  document.body.removeChild(anchor);
};

export const openExternalLinkTg = (url) => {
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.openLink(url);
  } else {
    console.warn("Telegram WebApp is not available");
    notify("Telegram WebApp is not available");
    // Fallback to using a regular window.open if Telegram WebApp is not available
    window.open(url, "_blank", "noopener noreferrer");
  }
};

function formatDate(dateStr) {
  const date = new Date(dateStr);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getDate() + 1).toString().padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  const formattedDate = `${day}.${month}.${year} ${hour}:${minute}`;

  return formattedDate;
}

function formatPhone(phoneStr) {
  const formattedPhone = `+ ${phoneStr}`;
  return formattedPhone;
}

function formatNumberToString(num = 0) {
  const stringifiedNumber = num?.toLocaleString();
  const [beforeComma, afterComma] = stringifiedNumber.split(",");
  return { firstPart: beforeComma, lastPart: afterComma ? afterComma : "00" };
}
