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
// COMPONENTS
import ProtectedRoute from "components/protected-route/ProtectedRoute.component";
// CONTEXT
import { FocusedProvider } from "context/IsFocused.context";
import { CounterValueProvider } from "context/CounterValue.context";
// ACTIONS
import { setTgHash } from "store/common/common.actions";
import { getUser } from "store/user/user.actions";
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

  const { isOrderDone, tgHash } = useSelector(commonSelector);
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

  useEffect(() => {
    if (userData?.subscribed) {
      navigate(pathname);
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const params = {
      auth_data: {
        auth: tgHash.checkDataString,
        hash: tgHash.hash,
      },
    };
    dispatch(getUser(params));
  }, []);

  return (
    <React.Fragment>
      <FocusedProvider>
        <CounterValueProvider>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/main"
              element={
                <ProtectedRoute isUserSubscribed={userData?.subscribed}>
                  <MainPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order"
              element={
                <ProtectedRoute isUserSubscribed={userData?.subscribed}>
                  <OrderPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute isUserSubscribed={userData?.subscribed}>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/language"
              element={
                <ProtectedRoute isUserSubscribed={userData?.subscribed}>
                  <LanguagePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute isUserSubscribed={userData?.subscribed}>
                  <MyOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/referral"
              element={
                <ProtectedRoute isUserSubscribed={userData?.subscribed}>
                  <ReferralPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/support"
              element={
                <ProtectedRoute isUserSubscribed={userData?.subscribed}>
                  <SupportPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/top-up"
              element={
                <ProtectedRoute isUserSubscribed={userData?.subscribed}>
                  <TopUpPage />
                </ProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer />
        </CounterValueProvider>
      </FocusedProvider>
    </React.Fragment>
  );
}

export default App;
