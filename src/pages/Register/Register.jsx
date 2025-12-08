import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";

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
        // Fallback
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
    <div className="flex items-center justify-center bg-base-200 py-10 my-10 px-4">
      <div className="card w-full max-w-lg shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-3xl font-black text-center text-gradient mb-2">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Join RouteLynk to book tickets easily
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name & Photo URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold mb-2">
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`input input-bordered w-full ${
                    errors.name ? "input-error" : ""
                  }`}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-error text-xs mt-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold mb-2">
                    Photo URL
                  </span>
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className={`input input-bordered w-full ${
                    errors.photoURL ? "input-error" : ""
                  }`}
                  {...register("photoURL", {
                    required: "Photo URL is required",
                  })}
                />
                {errors.photoURL && (
                  <span className="text-error text-xs mt-1">
                    {errors.photoURL.message}
                  </span>
                )}
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      // At least one Uppercase and one Lowercase
                      value: /(?=.*[A-Z])(?=.*[a-z])/,
                      message:
                        "Must include one uppercase and one lowercase letter",
                    },
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
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-gradient w-full">Register</button>
            </div>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-bold">
              Login here
            </Link>
          </p>

          {/* Divider */}
          <div className="divider text-sm text-gray-400">OR</div>

          {/* Social Login */}
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-primary w-full"
          >
            <FaGoogle /> Sign up with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
