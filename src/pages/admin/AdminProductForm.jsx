import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { productSchema } from "../../schemas/productSchema";
import { ProductContext } from "../../contexts/ProductContext";
import instance from "../../services";

const AdminProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  const nav = useNavigate();
  const { id } = useParams();
  const { dispatch } = useContext(ProductContext);
  useEffect(() => {
    (async () => {
      if (!id) return;
      const { data } = await instance.get(`/products/${id}`);
      reset(data);
    })();
  }, []);
  async function handleProductForm(formData) {
    try {
      if (id) {
        const { data } = await instance.put(`/products/${id}`, formData);
        console.log(data);
        dispatch({ type: "UPDATE_PRODUCT", payload: data });
        nav("/admin");
        reset();
      } else {
        const { data } = await instance.post("/products", formData);
        dispatch({ type: "ADD_PRODUCT", payload: data });
        confirm("Admin Page?") && nav("/admin");
        reset();
      }
    } catch (error) {
      console.log(error);
      alert(error?.response?.data);
    }
  }
  return (
    <div className="mx-auto w-[500px] border rounded-md p-3 m-3">
      <h1 className="text-center text-2xl mt-3">
        {id ? "Update" : "Add"} product
      </h1>
      <form onSubmit={handleSubmit(handleProductForm)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="border rounded-md p-1"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-red-500">{errors.title.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="price">price</label>
          <input
            type="number"
            className="border rounded-md p-1"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="border rounded-md p-1"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500">{errors.description.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            className="border rounded-md p-1"
            {...register("stock", { valueAsNumber: true })}
          />
          {errors.stock && (
            <span className="text-red-500">{errors.stock.message}</span>
          )}
        </div>
        <div>
          <button className="p-2 bg-blue-500 rounded-md mt-3">
            {id ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductForm;
