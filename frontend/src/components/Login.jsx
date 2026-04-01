import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const loginInfo = {
      email: data.identifier,
      password: data.password,
    };

    try {
      // Backend is on 4001
      const res = await axios.post(
        "http://localhost:4001/user/login",
        loginInfo
      );

      alert("Login Successful!");

      localStorage.setItem("KitUp_User", JSON.stringify(res.data.user));
      document.getElementById("my_modal_3").close();
      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Credentials");
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box dark:bg-slate-900 dark:text-white max-w-md border relative">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById("my_modal_3").close()}
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-center mb-4">SIGN IN</h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-sm font-medium">Enter Email*</label>
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border rounded-md outline-none dark:bg-slate-800"
              {...register("identifier", { required: true })}
            />
            {errors.identifier && <span className="text-red-500 text-sm">Required</span>}
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium">Enter Password*</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-800"
                {...register("password", { required: true })}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-400 text-black font-semibold rounded-full hover:bg-green-500 transition"
          >
            Sign In
          </button>

          <p className="text-center mt-4 text-sm">
            Not registered?{" "}
            <Link to="/signup" className="text-blue-500 underline" onClick={() => document.getElementById("my_modal_3").close()}>
              Signup
            </Link>
          </p>
        </form>
      </div>
    </dialog>
  );
}

export default Login; // 👈 Fixed the export!