// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";

// function Login() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmit = (data) => {
//     console.log(data);
//   };

//   return (
//     <dialog id="my_modal_3" className="modal">
//       <div className="modal-box dark:bg-slate-900 dark:text-white max-w-md border">
//         {/* Close button */}
//         <button
//           className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//           onClick={() => document.getElementById("my_modal_3").close()}
//         >
//           ✕
//         </button>

//         <h3 className="text-xl font-bold text-center mb-4">SIGN IN</h3>

//         {/* Google login */}
//         <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 dark:hover:bg-slate-800">
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="google"
//             className="w-5 h-5"
//           />
//           <span className="font-medium">Log in with Google</span>
//         </button>

//         {/* OR divider */}
//         <div className="flex items-center my-4">
//           <hr className="flex-grow border-gray-300" />
//           <span className="mx-2 text-sm text-gray-500">OR</span>
//           <hr className="flex-grow border-gray-300" />
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Email / Mobile */}
//           <div className="mb-4">
//             <label className="text-sm font-medium">
//               Enter mobile number / Email*
//             </label>
//             <input
//               type="text"
//               placeholder="Enter mobile number or email"
//               className="w-full mt-1 px-3 py-2 border rounded-md outline-none dark:bg-slate-800"
//               {...register("identifier", { required: true })}
//             />
//             {errors.identifier && (
//               <span className="text-red-500 text-sm">
//                 This field is required
//               </span>
//             )}
//           </div>

//           {/* Password / OTP */}
//           <div className="mb-4">
//             <label className="text-sm font-medium">
//               Enter OTP / Password*
//             </label>
//             <div className="flex items-center gap-2 mt-1">
//               <div className="relative w-full">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter OTP or password"
//                   className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-800"
//                   {...register("password", { required: true })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-2 top-2 text-gray-500"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   👁
//                 </button>
//               </div>

//               <button
//                 type="button"
//                 className="px-3 py-2 bg-black text-white rounded-md text-sm"
//               >
//                 SEND OTP
//               </button>
//             </div>

//             {errors.password && (
//               <span className="text-red-500 text-sm">
//                 This field is required
//               </span>
//             )}
//           </div>

//           {/* Sign In button */}
//           <button
//             type="submit"
//             className="w-full py-2 bg-green-400 text-black font-semibold rounded-full hover:bg-green-500 transition"
//           >
//             Sign In
//           </button>

//           {/* Signup link */}
//           <p className="text-center mt-4 text-sm">
//             Not registered?{" "}
//             <Link to="/signup" className="text-blue-500 underline">
//               Signup
//             </Link>
//           </p>
//         </form>
//       </div>
//     </dialog>
//   );
// }

// export default Login;


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

  // ✅ Backend-connected submit
  const onSubmit = async (data) => {
    const loginInfo = {
      email: data.identifier, // email or mobile (backend can decide)
      password: data.password,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginInfo
      );

      alert("Login Successful!");

      // save user + token
      localStorage.setItem("KitUp_User", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

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

        {/* Close button */}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById("my_modal_3").close()}
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-center mb-4">SIGN IN</h3>

        {/* Google login (UI only) */}
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

        {/* ✅ FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>

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

              {/* UI only */}
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

          {/* Sign In */}
          <button
            type="submit"
            className="w-full py-2 bg-green-400 text-black font-semibold rounded-full hover:bg-green-500 transition"
          >
            Sign In
          </button>

          {/* Signup link */}
          <p className="text-center mt-4 text-sm">
            Not registered?{" "}
            <Link to="/signup" className="text-blue-500 underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </dialog>
  );
}

export default Login;
