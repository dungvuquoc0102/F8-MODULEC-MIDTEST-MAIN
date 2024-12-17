import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user")) || {};
    if (localUser.role !== "admin") {
      nav("/");
    } else {
      setUser(localUser);
    }
  }, []);
  function handleLogout() {
    if (confirm("Logout?")) {
      localStorage.setItem("user", "{}");
      nav("/");
    }
  }
  return (
    <>
      <header className="container mx-auto border-b flex justify-between py-3 items-center">
        <div>
          <Link to="/admin">Admin logo</Link>
        </div>
        <div>
          <span>Hello {user.email?.split("@")[0]}</span>
          <button
            className="p-2 bg-gray-500 rounded-md ml-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default AdminLayout;
