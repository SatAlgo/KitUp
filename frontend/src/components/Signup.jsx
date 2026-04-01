import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Login from "./Login";
import toast, { Toaster } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false); // 👈 Controls OTP View
  const [userEmail, setUserEmail] = useState(""); // Store email for verification
  const [otpValue, setOtpValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // 1. Handle initial Signup (Triggers OTP)
  const onSubmit = async (data) => {
    const signupInfo = {
      name: data.firstName,
      surname: data.lastName,
      email: data.email,
      password: data.password,
      mobNumber: data.mobile,
      address: data.address,
    };

    try {
      const res = await axios.post("http://localhost:4001/user/signup", signupInfo);
      
      // If successful, backend returns 200 and sends OTP
      toast.success(res.data.message);
      setUserEmail(data.email);
      setShowOtpScreen(true); // 👈 Now asks for OTP
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  // 2. Handle OTP Verification
  const onVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otpValue || otpValue.length < 6) {
      return toast.error("Please enter a valid 6-digit OTP");
    }

    const requestData = {
      email: userEmail, // 👈 Ensure this state was set during handleSignup
      otp: otpValue
    };

    try {
      const res = await axios.post("http://localhost:4001/user/verify-otp", requestData);
      toast.success("Email Verified! Welcome to KitUp.");
      localStorage.setItem("KitUp_User", JSON.stringify(res.data.user));
      setTimeout(() => { navigate("/"); window.location.reload(); }, 2000);
    } catch (err) {
      // This catches the 400 error and tells you WHY (e.g. "OTP Expired")
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-950 px-4">
      <Toaster />
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border rounded-lg shadow-md p-8 relative">
        <button
          className="absolute right-4 top-4 btn btn-sm btn-circle btn-ghost"
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        {!showOtpScreen ? (
          <>
            <h2 className="text-center font-bold text-xl uppercase">Register for KitUp</h2>
            <hr className="my-4 border-gray-300 dark:border-gray-700" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">First Name*</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded outline-none dark:bg-slate-800"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && <p className="text-red-500 text-sm">Required</p>}
                </div>
                <div>
                  <label className="font-medium">Last Name*</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded outline-none dark:bg-slate-800"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && <p className="text-red-500 text-sm">Required</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">WhatsApp Number*</label>
                  <input
                    type="tel"
                    placeholder="10 digit number"
                    className="w-full mt-1 px-3 py-2 border rounded outline-none dark:bg-slate-800"
                    {...register("mobile", { required: true, pattern: /^[0-9]{10}$/ })}
                  />
                  {errors.mobile && <p className="text-red-500 text-sm">Valid 10-digit number required</p>}
                </div>
                <div>
                  <label className="font-medium">College Email*</label>
                  <input
                    type="email"
                    className="w-full mt-1 px-3 py-2 border rounded outline-none dark:bg-slate-800"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <p className="text-red-500 text-sm">Required</p>}
                </div>
              </div>

              <div>
                <label className="font-medium">Hostel / Area (e.g. Dehu Phata)*</label>
                <input
                  type="text"
                  className="w-full mt-1 px-3 py-2 border rounded outline-none dark:bg-slate-800"
                  {...register("address", { required: true })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">Password*</label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-3 py-2 border rounded outline-none dark:bg-slate-800"
                      {...register("password", { required: true, minLength: 6 })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm">Min 6 characters</p>}
                </div>
                <div>
                  <label className="font-medium">Confirm Password*</label>
                  <input
                    type="password"
                    className="w-full mt-1 px-3 py-2 border rounded outline-none dark:bg-slate-800"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (v) => v === watch("password") || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-green-400 hover:bg-green-500 text-black font-semibold rounded-md transition"
              >
                Get Verification OTP
              </button>
            </form>
          </>
        ) : (
          /* --- OTP VERIFICATION UI --- */
          <div className="py-10 text-center">
            <h2 className="text-2xl font-bold mb-2">Verify Your Account</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              We sent a 6-digit code to <b>{userEmail}</b> and your WhatsApp.
            </p>
            <form onSubmit={onVerifyOtp} className="max-w-xs mx-auto space-y-6">
              <input
                type="text"
                placeholder="000000"
                maxLength="6"
                className="w-full px-4 py-3 text-center text-2xl tracking-widest border rounded-lg outline-none dark:bg-slate-800"
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition"
              >
                Verify & Finish
              </button>
              <button
                type="button"
                className="text-sm text-gray-500 hover:underline"
                onClick={() => setShowOtpScreen(false)}
              >
                Change details / Go back
              </button>
            </form>
          </div>
        )}

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            Login
          </button>
        </p>
      </div>
      <Login />
    </div>
  );
}

export default Signup;