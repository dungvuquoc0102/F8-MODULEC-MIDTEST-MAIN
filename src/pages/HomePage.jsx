import React, { useContext, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import instance from "../services";

const HomePage = () => {
  const { state, dispatch } = useContext(ProductContext);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      dispatch({ type: "SET_PRODUCTS", payload: data });
    })();
  }, []);
  return (
    <div className="container mx-auto py-3">
      {/* function */}
      <div></div>
      <div className="grid grid-cols-5 gap-3">
        {state.products.map((item) => (
          <div key={item.id}>
            <img src={item.thumbnail} alt="img" />
            <div>{item.title}</div>
            <div>{item.price}</div>
            <button className="bg-green-500 p-2 rounded-md">Show detail</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
