import React, { useContext, useEffect } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import instance from "../../services";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const { state, dispatch } = useContext(ProductContext);
  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/products");
      dispatch({ type: "SET_PRODUCTS", payload: data });
    })();
  }, []);
  async function handleDelete(id) {
    if (confirm("Delete?")) {
      const res = instance.delete(`/products/${id}`);
      dispatch({ type: "DELETE_PRODUCT", payload: +id });
    }
  }
  return (
    <div className="container mx-auto py-4">
      <div>
        <Link to="/admin/product-add" className="p-2 bg-blue-500 rounded-md">
          Add
        </Link>
      </div>
      <div className="border rounded-md mt-3">
        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="p-2">Id</th>
              <th className="p-2">Title</th>
              <th className="p-2">Price</th>
              <th className="p-2">Desc</th>
              <th className="p-2">Stock</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {console.log(state)}
            {state.products.map((item) => (
              <tr key={item.id}>
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.title}</td>
                <td className="p-2">{item.price}</td>
                <td className="p-2">{item.description}</td>
                <td className="p-2">{item.stock}</td>
                <td className="p-2 flex">
                  <Link
                    to={`/admin/product-update/${item.id}`}
                    className="p-2 block h-[40px] bg-yellow-500 rounded-md mr-2"
                  >
                    Update
                  </Link>
                  <button
                    className="p-2  bg-red-500 rounded-md"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
