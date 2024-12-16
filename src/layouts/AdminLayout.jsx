import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const role = localStorage.getItem("role") || "";
  const nav = useNavigate();
  useEffect(() => {
    if (role !== "admin") {
      nav("/");
    }
  }, []);
  return (
    <>
      <header>Header</header>
      <Outlet />
    </>
  );
};

export default AdminLayout;
