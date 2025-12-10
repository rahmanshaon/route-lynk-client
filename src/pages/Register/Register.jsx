import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import InputField from "../../components/Shared/Form/InputField";

const Register = () => {
  useTitle("Register");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile, googleSignIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle Email/Password Registration
  const onSubmit = async (data) => {
    try {
      // Create User in Firebase
      await createUser(data.email, data.password);

      // Update Profile in Firebase
      await updateUserProfile(data.name, data.photoURL);

      // Save User Data to MongoDB
      const userInfo = {
        name: data.name,
        email: data.email,
        image: data.photoURL,
      };

      const res = await axiosPublic.put(`/users/${data.email}`, userInfo);

      // Verify Database Success & Redirect
      if (res.data.upsertedId || res.data.matchedCount > 0) {
        toast.success(`Welcome to RouteLynk, ${data.name}!`);
        navigate("/");
      } else {
        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please login.");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();

      // Save/Update Google User in MongoDB
      const userInfo = {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      };

      await axiosPublic.put(`/users/${result.user.email}`, userInfo);

      toast.success("Signed in with Google successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-base-200 transition-colors duration-300">
      {/* --- Header --- */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black text-gradient mb-2">
          Create Account
        </h1>
        <p className="text-base-content/70 font-medium">
          Join RouteLynk to book tickets easily
        </p>
      </div>

      {/* --- Card --- */}
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-200">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <InputField
              label="Full Name"
              name="name"
              placeholder="John Doe"
              register={register}
              errors={errors}
              required
            />

            {/* Photo URL */}
            <InputField
              label="Photo URL"
              name="photoURL"
              type="url"
              placeholder="https://example.com/photo.jpg"
              register={register}
              errors={errors}
              required
            />

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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[a-z])/,
                      message:
                        "Must include one uppercase and one lowercase letter",
                    },
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
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-gradient w-full text-white font-bold text-lg shadow-lg">
                Register
              </button>
            </div>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm mt-6 text-base-content/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link link-primary font-bold no-underline hover:underline"
            >
              Login here
            </Link>
          </p>

          {/* Divider */}
          <div className="divider text-xs font-bold text-base-content/30 uppercase tracking-widest my-6">
            OR
          </div>

          {/* Social Login */}
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-primary w-full flex items-center gap-2"
          >
            <FaGoogle className="text-lg" />
            Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
