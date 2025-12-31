// import React from "react";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";

// function Login() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => console.log(data);
//   return (
//     <div>
//       <dialog id="my_modal_3" className="modal">
//         <div className="modal-box dark:bg-slate-900 dark:text-white border border-white">
//           <form onSubmit={handleSubmit(onSubmit)} method="dialog">
//             {/* if there is a button in form, it will close the modal */}
//             <Link
//               to="/"
//               className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//               onClick={() => document.getElementById("my_model_3").close()}
//             >
//               ✕
//             </Link>

//             <h3 className="font-bold text-lg">Login</h3>
//             {/* email */}
//             <div className="mt-4 space-y-2">
//               <span>Email</span>
//               <br />
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-80 px-3 py-1 border rounded-md outline-none"
//                 {...register("email", { required: true })}
//               />
//               <br />
//               {errors.email && <span className="text-sm text-red-500" >This field is required</span>}
//             </div>
//             {/* password */}
//             <div className="mt-4 space-y-2">
//               <span>Password</span>
//               <br />
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-80 px-3 py-1 border rounded-md outline-none"
//                 {...register("password", { required: true })}
//               />
//               <br />
//               {errors.password && <span className="text-sm text-red-500">This field is required</span>}
//             </div>

//             {/* button */}
//             <div className="flex justify-between mt-4">
//               <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
//                 Login
//               </button>
//               <p>
//                 Not registered?{" "}
//                 <Link
//                   to="/signup"
//                   className="underline text-blue-500 cursor-pointer"
//                 >
//                   Signup
//                 </Link>{" "}
//               </p>
//             </div>
//           </form>
//         </div>
//       </dialog>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    console.log(data);
    try {
      await login(data);
      document.getElementById("my_modal_3").close();
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box dark:bg-slate-900 dark:text-white max-w-md border">
        {/* Close button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById("my_modal_3").close()}
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-center mb-4">SIGN IN</h3>

        {/* Google login */}
        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className="font-medium">Log in with Google</span>
        </button>

        {/* OR divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Email / Mobile */}
          <div className="mb-4">
            <label className="text-sm font-medium">
              Enter mobile number / Email*
            </label>
            <input
              type="text"
              placeholder="Enter mobile number or email"
              className="w-full mt-1 px-3 py-2 border rounded-md outline-none dark:bg-slate-800"
              {...register("identifier", { required: true })}
            />
            {errors.identifier && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          {/* Password / OTP */}
          <div className="mb-4">
            <label className="text-sm font-medium">
              Enter OTP / Password*
            </label>
            <div className="flex items-center gap-2 mt-1">
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter OTP or password"
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

              <button
                type="button"
                className="px-3 py-2 bg-black text-white rounded-md text-sm"
              >
                SEND OTP
              </button>
            </div>

            {errors.password && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          {/* Sign In button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-green-400 text-black font-semibold rounded-full hover:bg-green-500 transition disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          {/* Signup link */}
          <p className="text-center mt-4 text-sm">
            Not registered?{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Signup
            </Link>
          </p>
          
          <p className="text-center mt-2 text-sm">
            <Link to="/forgot-password" className="text-blue-500 underline">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </dialog>
  );
}

export default Login;
