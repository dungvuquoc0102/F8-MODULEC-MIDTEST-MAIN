import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import AdminLayout from "./layouts/AdminLayout";
import AdminPage from "./pages/admin/AdminPage";
import RegisterLayout from "./layouts/RegisterLayout";
import LoginLayout from "./layouts/LoginLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
      </Route>
      <Route path="/register" element={<RegisterLayout />} />
      <Route path="/login" element={<LoginLayout />} />
    </Routes>
  );
};

export default App;
