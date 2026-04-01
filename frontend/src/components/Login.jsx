// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// function Login() {
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const [showPassword, setShowPassword] = useState(false);

//   const onSubmit = async (data) => {
//     const loginInfo = {
//       email: data.identifier,
//       password: data.password,
//     };

//     try {
//       // Backend is on 4001
//       const res = await axios.post(
//         "http://localhost:4001/user/login",
//         loginInfo
//       );

//       alert("Login Successful!");

//       localStorage.setItem("KitUp_User", JSON.stringify(res.data.user));
//       document.getElementById("my_modal_3").close();
//       navigate("/");
//       window.location.reload();
//     } catch (err) {
//       alert(err.response?.data?.message || "Invalid Credentials");
//     }
//   };

//   return (
//     <dialog id="my_modal_3" className="modal">
//       <div className="modal-box dark:bg-slate-900 dark:text-white max-w-md border relative">
//         <button
//           className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//           onClick={() => document.getElementById("my_modal_3").close()}
//         >
//           ✕
//         </button>

//         <h3 className="text-xl font-bold text-center mb-4">SIGN IN</h3>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label className="text-sm font-medium">Enter Email*</label>
//             <input
//               type="text"
//               placeholder="Enter your email"
//               className="w-full mt-1 px-3 py-2 border rounded-md outline-none dark:bg-slate-800"
//               {...register("identifier", { required: true })}
//             />
//             {errors.identifier && <span className="text-red-500 text-sm">Required</span>}
//           </div>

//           <div className="mb-4">
//             <label className="text-sm font-medium">Enter Password*</label>
//             <div className="relative mt-1">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter password"
//                 className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-800"
//                 {...register("password", { required: true })}
//               />
//               <button
//                 type="button"
//                 className="absolute right-2 top-2 text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 👁
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 bg-green-400 text-black font-semibold rounded-full hover:bg-green-500 transition"
//           >
//             Sign In
//           </button>

//           <p className="text-center mt-4 text-sm">
//             Not registered?{" "}
//             <Link to="/signup" className="text-blue-500 underline" onClick={() => document.getElementById("my_modal_3").close()}>
//               Signup
//             </Link>
//           </p>
//         </form>
//       </div>
//     </dialog>
//   );
// }

// export default Login; // 👈 Fixed the export!
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLoginSubmit = async (data) => {
    setLoading(true);
    try {
      // Backend must be running on 4001
      const res = await axios.post("http://localhost:4001/user/login", {
        email: data.identifier,
        password: data.password,
      });
      
      if (res.data && res.data.user) {
        // 1. SAVE TO LOCAL STORAGE
        localStorage.setItem("KitUp_User", JSON.stringify(res.data.user));

        // 2. TRIGGER NAVBAR SYNC
        window.dispatchEvent(new Event("auth-change"));

        // 3. CLOSE MODAL UI
        const modal = document.getElementById("my_modal_3");
        if (modal) modal.close();

        // 4. ATLAS LATENCY BUFFER
        // We wait 300ms to ensure localStorage 'settles' before the hard reload
        setTimeout(() => {
          window.location.reload(); 
        }, 300);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid Credentials or Connection Issue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box dark:bg-slate-900 dark:text-white max-w-md border relative shadow-2xl rounded-3xl">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
          onClick={() => document.getElementById("my_modal_3").close()}
        >✕</button>

        <h3 className="text-2xl font-black text-center mb-6 uppercase tracking-tight">Sign In</h3>
        <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
            <input
              type="email"
              placeholder="name@college.edu"
              className="w-full mt-1 px-4 py-3 border rounded-xl outline-none dark:bg-slate-800 focus:border-lime-400 transition-all"
              {...register("identifier", { required: true })}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full px-4 py-3 border rounded-xl outline-none dark:bg-slate-800 focus:border-lime-400 transition-all"
                {...register("password", { required: true })}
              />
              <button 
                type="button" 
                className="absolute right-3 top-3.5 text-gray-500" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-lime-400 text-black font-black rounded-2xl hover:bg-lime-500 transition shadow-lg shadow-lime-400/20 uppercase tracking-widest disabled:bg-gray-400"
          >
            {loading ? "Authenticating..." : "Enter KitUp"}
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm font-medium">
          New here? <Link to="/signup" className="text-blue-500 underline" onClick={() => document.getElementById("my_modal_3").close()}>Create Account</Link>
        </p>
      </div>
    </dialog>
  );
}

export default Login;