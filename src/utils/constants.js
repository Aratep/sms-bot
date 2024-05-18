// IMAGES
import wa from "assets/imgs/wa.png"; // temporary
// settings images
import wallet from "assets/imgs/settings/wallett.png";
import folder from "assets/imgs/settings/folder.png";
import referral from "assets/imgs/settings/referral.png";
import settings from "assets/imgs/settings/settings.png";
import language from "assets/imgs/settings/globe.png";
// languages images
import ru from "assets/imgs/lang/ru.png";
import en from "assets/imgs/lang/en.png";
// order images
import ca from "assets/imgs/ca.png";
import am from "assets/imgs/am.png";

export const initialCounter = 900000;

export const accountRoutes = [
  "/my-orders",
  "/settings",
  "/language",
  "/support",
  "/referral",
  "/top-up",
];
export const mainRoutes = ["/", "/main", "/order", "/repeat-code"];

export const countriesList = [
  { id: 1, title: "Telegram", from: "1,5", src: wa },
  { id: 2, title: "Whatsapp", from: "1,5", src: wa },
  { id: 3, title: "Spotify", from: "1,5", src: wa },
  { id: 4, title: "Amazon", from: "1,5", src: wa },
  { id: 5, title: "Aliexpress", from: "1,5", src: wa },
];

export const languages = [
  { id: 1, title: "English", src: en },
  { id: 2, title: "Russian", src: ru },
];

export const settingsMenuItems = [
  { id: 1, icon: wallet, title: "Top up balance", route: "/top-up" },
  { id: 2, icon: folder, title: "My orders", route: "/my-orders" },
  { id: 3, icon: referral, title: "Referral program", route: "/referral" },
  { id: 4, icon: settings, title: "Support", route: "/support" },
  { id: 5, icon: language, title: "Language", route: "/language" },
];

export const orders = [
  { id: 1, title: "Amazon", src: am },
  { id: 2, title: "Canada", src: ca },
];

export const myOrdersItems = [
  {
    id: 1,
    src: ca,
    title: "+1 403 656 66 46",
    code: "434 565",
    date: "13.04.2024 13:34",
  },
  {
    id: 2,
    src: ca,
    title: "+1 403 656 66 85",
    code: "434 565",
    date: "13.04.2024 13:34",
  },
  {
    id: 3,
    src: ca,
    title: "+1 403 656 55 87",
    code: "434 565",
    date: "13.04.2024 13:34",
  },
  {
    id: 4,
    src: ca,
    title: "+1 403 666 55 44",
    code: "434 565",
    date: "13.04.2024 13:34",
  },
  {
    id: 5,
    src: ca,
    title: "+1 403 785 98 25",
    code: "434 565",
    date: "13.04.2024 13:34",
  },
  {
    id: 6,
    src: ca,
    title: "+1 403 789 25 98",
    code: "434 565",
    date: "13.04.2024 13:34",
  },
  {
    id: 7,
    src: ca,
    title: "+1 403 102 55 71",
    code: "434 565",
    date: "13.04.2024 13:34",
  },
  {
    id: 8,
    src: ca,
    title: "+1 403 222 11 00",
    code: "434 565",
    date: "13.04.2024 13:34",
  },
];
