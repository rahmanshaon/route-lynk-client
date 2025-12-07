import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("Login");
  const [showPassword, setShowPassword] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to where they came from, or home
  const from = location.state?.from?.pathname || "/";

  // Handle Email/Password Login
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((result) => {
        toast.success("Login Successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Invalid email or password.");
      });
  };

  // Handle Google Login
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        toast.success(`Welcome back, ${result.user.displayName}!`);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google Sign-In failed.");
      });
  };

  return (
    <div className="flex items-center justify-center py-10 my-10 px-4">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-black text-center text-gradient mb-6">
            Welcome Back!
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold mb-2">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-error text-xs mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold mb-2">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  className={`input input-bordered w-full ${
                    errors.password ? "input-error" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <span
                  className="absolute right-4 top-3.5 z-50 cursor-pointer text-gray-500 hover:text-primary transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {errors.password && (
                <span className="text-error text-xs mt-1">
                  {errors.password.message}
                </span>
              )}

              {/* <label className="label">
                <a
                  href="#"
                  className="label-text-alt link link-hover text-primary mt-2"
                >
                  Forgot password?
                </a>
              </label> */}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button className="btn btn-gradient w-full">Login</button>
            </div>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm mt-4">
            New to RouteLynk?{" "}
            <Link to="/register" className="link link-primary font-bold">
              Create an account
            </Link>
          </p>

          {/* Divider */}
          <div className="divider text-sm text-gray-400">OR</div>

          {/* Social Login */}
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-primary w-full"
          >
            <FaGoogle /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
