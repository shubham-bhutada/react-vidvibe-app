import React, { useEffect } from "react";
import HomePage from "./pages/homePage/HomePage";
import "./App.css";
import LoginPage from "./pages/loginPage/LoginPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { useSelector } from "react-redux";
import WatchPage from "./pages/watchPage/WatchPage";
import SearchPage from "./pages/searchPage/SearchPage";
import ChannelPage from "./pages/channelPage/ChannelPage";

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/auth");
    }
  }, [accessToken, loading, navigate]);
  return (
    <Routes>
      <Route path="/" element={<Layout Children={<HomePage />} />} />
      <Route path="/auth" element={<LoginPage />} />
      <Route path="search/:q" element={<Layout Children={<SearchPage />} />} />
      <Route path="/watch/:id" element={<Layout Children={<WatchPage />} />} />
      <Route
        path="/channel/:channelId"
        element={<Layout Children={<ChannelPage />} />}
      />
    </Routes>
  );
};

export default App;
