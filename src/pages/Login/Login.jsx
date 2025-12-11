import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import InputField from "../../components/Shared/Form/InputField";

const Login = () => {
  useTitle("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { signIn, googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailValue = watch("email");

  // --- Email Login ---
  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      // Login with Firebase
      const result = await signIn(data.email, data.password);
      const user = result.user;

      const userInfo = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      };
      // Sync with MongoDB
      await axiosPublic.put(`/users/${user.email}`, userInfo);

      toast.success("Login Successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Invalid email or password.");
    } finally {
      setProcessing(false);
    }
  };

  // --- Google Login ---
  const handleGoogleSignIn = async () => {
    setProcessing(true);
    try {
      const result = await googleSignIn();
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      };

      // Sync with MongoDB
      await axiosPublic.put(`/users/${result.user.email}`, userInfo);

      toast.success(`Welcome back, ${result.user.displayName}!`);
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Google Sign-In failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-base-200 transition-colors duration-300">
      {/* --- Header --- */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-4xl font-black text-gradient mb-2">
          Log In to RouteLynk
        </h1>
        <p className="text-base-content/70 font-medium">
          Access your bookings and manage your journeys
        </p>
      </div>

      {/* --- Card --- */}
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-200">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder="email@example.com"
              register={register}
              errors={errors}
              required
            />

            {/* Password Field */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-base-content/80 text-sm mb-2">
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  className={`input input-bordered w-full bg-base-100 text-base-content placeholder:text-base-content/40 focus:outline-none pr-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <button
                  type="button"
                  className="absolute right-4 top-3.5 z-10 text-base-content/50 hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <span className="text-error text-xs mt-1 font-medium">
                  {errors.password.message}
                </span>
              )}

              <br />

              {/* Forgot Password */}
              <label className="label">
                <Link
                  to="/forget-password"
                  state={{ email: emailValue }}
                  className="label-text-alt link link-hover text-primary font-bold ml-auto"
                >
                  Forgot password?
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button
                disabled={processing}
                className="btn btn-gradient w-full text-white font-bold text-lg shadow-lg disabled:opacity-70"
              >
                {processing ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm mt-6 text-base-content/60">
            New to RouteLynk?{" "}
            <Link to="/register" className="link link-primary font-bold">
              Create Account
            </Link>
          </p>

          {/* Divider */}
          <div className="divider text-xs font-bold text-base-content/30 uppercase tracking-widest my-6">
            OR
          </div>

          {/* Social Login */}
          <button
            onClick={handleGoogleSignIn}
            disabled={processing}
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
