import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schemas/loginSchema";
import instance from "../services";
import { useNavigate } from "react-router-dom";

const LoginLayout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const nav = useNavigate();
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user")) || {};
    if (localUser.email) {
      nav("/");
    }
  }, []);
  async function handleLogin(formData) {
    try {
      const { data } = await instance.post("/login", formData);
      localStorage.setItem("user", JSON.stringify(data?.user));
      nav("/admin");
      reset();
    } catch (error) {
      console.log(error);
      alert(error?.response?.data);
    }
  }
  return (
    <div className="mx-auto w-[500px]">
      <h1 className="text-center text-2xl mt-3">Login Account</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border rounded-md p-1"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border rounded-md p-1"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <button className="p-2 bg-blue-500 rounded-md mt-3">Login</button>
      </form>
    </div>
  );
};

export default LoginLayout;
