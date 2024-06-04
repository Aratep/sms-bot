// settings images
import wallet from "assets/imgs/settings/wallet.jpg";
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
export const API =
  process.env.NODE_ENV === "development"
    ? "http://147.45.159.97:8080/api"
    : "/api";
export const API_URL = "http://147.45.159.97:8080";

export const accountRoutes = [
  "/my-orders",
  "/settings",
  "/language",
  "/support",
  "/referral",
  "/top-up",
];
export const mainRoutes = ["/", "/main", "/order", "/repeat-code"];

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
