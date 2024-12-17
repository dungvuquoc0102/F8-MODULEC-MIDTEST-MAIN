import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import AdminLayout from "./layouts/AdminLayout";
import AdminPage from "./pages/admin/AdminPage";
import RegisterLayout from "./layouts/RegisterLayout";
import LoginLayout from "./layouts/LoginLayout";
import AdminProductForm from "./pages/admin/AdminProductForm";
import NotFoundPage from "./layouts/NotFoundPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPage />} />
        <Route path="product-add" element={<AdminProductForm />} />
        <Route path="product-update/:id" element={<AdminProductForm />} />
      </Route>
      <Route path="/register" element={<RegisterLayout />} />
      <Route path="/login" element={<LoginLayout />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
