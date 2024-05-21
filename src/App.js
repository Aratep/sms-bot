import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// PAGES
import MainPage from "pages/main/Main.page";
import OrderPage from "pages/order/Order.page";
import RepeatCodePage from "pages/repeat-code/RepeatCode.page";
import SettingsPage from "pages/settings/Settings.page";
import LanguagePage from "pages/language/Language.page";
import MyOrdersPage from "pages/my-orders/MyOrders.page";
import ReferralPage from "pages/referral/Referral.page";
import SupportPage from "pages/support/Support.page";
import TopUpPage from "pages/top-up/TopUp.page";
// STYLES
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/repeat-code" element={<RepeatCodePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/language" element={<LanguagePage />} />
        <Route path="/my-orders" element={<MyOrdersPage />} />
        <Route path="/referral" element={<ReferralPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/top-up" element={<TopUpPage />} />
      </Routes>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
