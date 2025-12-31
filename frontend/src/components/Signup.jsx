import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import Login from "./Login";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      await authService.register(data);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-950 px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 border rounded-lg shadow-md p-8 relative">

        {/* Close */}
        <button
          className="absolute right-4 top-4 btn btn-sm btn-circle btn-ghost"
          onClick={() => navigate("/")}
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-center font-bold text-xl">REGISTER</h2>
        <hr className="my-4 border-gray-300 dark:border-gray-700" />

        {success ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-5xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Registration Successful!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Please check your email for verification link.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">First Name*</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded outline-none dark:bg-slate-800"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>

                <div>
                  <label className="font-medium">Last Name*</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border rounded outline-none dark:bg-slate-800"
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">Required</p>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">Mobile Number*</label>
                  <div className="flex mt-1">
                    <span className="px-3 py-2 border border-r-0 rounded-l bg-gray-100 dark:bg-slate-800">
                      +91
                    </span>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border rounded-r outline-none dark:bg-slate-800"
                      {...register("mobile", {
                        required: true,
                        pattern: /^[0-9]{10}$/,
                      })}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-red-500 text-sm">
                      Enter valid 10-digit number
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-medium">Email*</label>
                  <input
                    type="email"
                    className="w-full mt-1 px-3 py-2 border rounded outline-none dark:bg-slate-800"
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value: /@mitaoe\.ac\.in$/,
                        message: "Only @mitaoe.ac.in emails are allowed",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium">Password*</label>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-3 py-2 border rounded outline-none dark:bg-slate-800"
                      {...register("password", {
                        required: true,
                        minLength: 6,
                      })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      👁
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      Min 6 characters
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-medium">Confirm Password*</label>
                  <input
                    type="password"
                    className="w-full mt-1 px-3 py-2 border rounded outline-none dark:bg-slate-800"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) =>
                        value === watch("password") ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-green-400 hover:bg-green-500 text-black font-semibold rounded-md disabled:opacity-50"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>

              {/* Login link */}
              <p className="text-center text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-500 underline"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Login
                </button>
              </p>

            </form>
          </>
        )}
      </div>

      <Login />
    </div>
  );
}

export default Signup;
