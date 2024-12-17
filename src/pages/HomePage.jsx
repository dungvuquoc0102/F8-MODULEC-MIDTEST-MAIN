import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contexts/ProductContext";
import instance from "../services";

const HomePage = () => {
  const { state, dispatch } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [layout, setLayout] = useState("grid");
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  useEffect(() => {
    (async () => {
      //product
      const { data } = await instance.get("/products");
      dispatch({ type: "SET_PRODUCTS", payload: data });
      //category
      const res = await instance.get("/categories");
      setCategories(res.data);
    })();
  }, []);
  async function handleChangeCategory(e) {
    const category = +e.target.value;
    setCategoryId(category);
    console.log(category);
    if (category === 0) {
      const { data } = await instance.get("/products");
      dispatch({ type: "SET_PRODUCTS", payload: data });
    } else {
      const { data } = await instance.get(`/products?categoryId=${category}`);
      dispatch({ type: "SET_PRODUCTS", payload: data });
    }
  }
  function changeLayout() {
    if (layout === "grid") {
      setLayout("list");
    } else {
      setLayout("grid");
    }
  }
  async function handleSearch(e) {
    const search = e.target.value;
    if (categoryId !== 0) {
      const res = await instance.get(
        `/products?categoryId=${categoryId}&title_like=${search}`
      );
      dispatch({ type: "SET_PRODUCTS", payload: res.data });
    } else {
      const res = await instance.get(`/products?title_like=${search}`);
      dispatch({ type: "SET_PRODUCTS", payload: res.data });
    }
  }
  return (
    <div className="container mx-auto py-3 ">
      {/* function */}
      <div className="flex items-center justify-between ">
        <button
          className="hover:cursor-pointer border rounded-md"
          onClick={changeLayout}
        >
          {layout === "grid" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          )}
        </button>

        <select
          className="border rounded-md p-1"
          name="cate"
          id="cate"
          onChange={handleChangeCategory}
        >
          <option value="0">All</option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="border rounded-md p-1">
          <input
            className="outline-none"
            type="text"
            placeholder="Search by title"
            onChange={handleSearch}
          />
          <div>{}</div>
        </div>
      </div>
      {state.products.length === 0 && (
        <div className="text-center py-7">No product</div>
      )}
      <div
        className={`grid ${
          layout === "grid" ? "grid-cols-4" : "grid-cols-1 divide-y"
        } gap-3 mt-3`}
      >
        {state.products.map((item) =>
          layout === "grid" ? (
            <div key={item.id}>
              <img
                className="rounded-md w-full"
                src={item.thumbnail}
                alt="img"
              />
              <div className="text-xl">{item.title}</div>
              <div className="text-gray-500">${item.price}</div>
              <button className="bg-green-500 p-2 rounded-md">
                Show detail
              </button>
            </div>
          ) : (
            <div
              key={item.id}
              className="flex justify-between items-center pt-3"
            >
              <img
                className="h-[70px] w-[200px] object-cover rounded-md"
                src={item.thumbnail}
                alt="img"
              />
              <div>{item.title}</div>
              <div className="text-gray-500">${item.price}</div>
              <button className="bg-green-500 p-2 rounded-md">
                Show detail
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
