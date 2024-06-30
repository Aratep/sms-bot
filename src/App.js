import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

// PAGES
import MainPage from "pages/main/Main.page";
import OrderPage from "pages/order/Order.page";
import SettingsPage from "pages/settings/Settings.page";
import LanguagePage from "pages/language/Language.page";
import MyOrdersPage from "pages/my-orders/MyOrders.page";
import ReferralPage from "pages/referral/Referral.page";
import SupportPage from "pages/support/Support.page";
import TopUpPage from "pages/top-up/TopUp.page";
import WelcomePage from "pages/welcome/Welcome.page";
// CONTEXT
import { FocusedProvider } from "context/IsFocused.context";
import { CounterValueProvider } from "context/CounterValue.context";
// ACTIONS
import { setTgHash } from "store/common/common.actions";
// SLICES
import { commonSelector } from "./store/common/common.slice";
import { userSelector } from "store/user/user.slice";
// STYLES
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { pathname } = useLocation();

  const { isOrderDone } = useSelector(commonSelector);
  const { data: userData } = useSelector(userSelector);

  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    const hasLaunched = localStorage.getItem("hasLaunched");
    if (!hasLaunched) {
      setIsFirstLaunch(true);
      localStorage.setItem("hasLaunched", "true");
    }
  }, []);

  useEffect(() => {
    dispatch(setTgHash());
    if (window.Telegram !== undefined) window.Telegram.WebApp.expand();
  }, []);

  useEffect(() => {
    if (userData?.subscribed === true) {
      navigate(pathname);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (isOrderDone === true && isFirstLaunch === false) {
      navigate("/order");
    }
  }, []);

  useEffect(() => {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        navigate(pathname);
      }
    }
  }, []);

  return (
    <React.Fragment>
      <FocusedProvider>
        <CounterValueProvider>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/language" element={<LanguagePage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
            <Route path="/referral" element={<ReferralPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/top-up" element={<TopUpPage />} />
          </Routes>
          <ToastContainer />
        </CounterValueProvider>
      </FocusedProvider>
    </React.Fragment>
  );
}

export default App;
