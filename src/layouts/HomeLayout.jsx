import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

const HomeLayout = () => {
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
      </header>
      <Outlet />
    </>
  );
};

export default HomeLayout;
