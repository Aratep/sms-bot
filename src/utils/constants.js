// languages images
import ru from "assets/imgs/lang/ru.png";
import en from "assets/imgs/lang/en.png";

// icons
import {
  BalanceIcon,
  LanguageIcon,
  OrderIcon,
  ReferralIcon,
  SupportIcon,
} from "../pages/settings/components/icons";

export const initialCounter = 900000;
export const API =
  process.env.NODE_ENV === "development"
    ? "http://147.45.159.97:8080/api"
    : "/api";
export const API_URL =
  process.env.NODE_ENV === "development" ? "http://147.45.159.97:8080" : "";

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
  { id: 1, icon: BalanceIcon, title: "Top up balance", route: "/top-up" },
  { id: 2, icon: OrderIcon, title: "My orders", route: "/my-orders" },
  { id: 3, icon: ReferralIcon, title: "Referral program", route: "/referral" },
  { id: 4, icon: SupportIcon, title: "Support", route: "/support" },
  { id: 5, icon: LanguageIcon, title: "Language", route: "/language" },
];
