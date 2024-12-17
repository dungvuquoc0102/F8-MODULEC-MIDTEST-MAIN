import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="w-[500px] mx-auto mt-10 flex flex-col items-center">
      <div>404 Not Found Page</div>
      <Link className="mt-3 p-2 bg-green-500 rounded-full" to="/">
        Go to home
      </Link>
    </div>
  );
};

export default NotFoundPage;
