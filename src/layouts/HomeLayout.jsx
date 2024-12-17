import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(localUser);
  }, []);
  function handleLogout() {
    if (confirm("Logout?")) {
      localStorage.setItem("user", "{}");
      setUser({});
      nav("/");
    }
  }
  return (
    <>
      <header className="border-b p-2 container mx-auto flex justify-between items-center">
        <div>
          <Link to="/">Logo</Link>
        </div>
        <nav>
          <ul className="flex gap-5">
            <li>
              <NavLink to="#!">New</NavLink>
            </li>
            <li>
              <NavLink to="#!">About</NavLink>
            </li>
          </ul>
        </nav>
        {user.email && (
          <div>
            <span>Hello {user.email?.split("@")[0]}</span>
            <button
              className="p-2 bg-gray-500 rounded-md ml-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};

export default HomeLayout;
