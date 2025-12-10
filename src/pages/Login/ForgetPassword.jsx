import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import InputField from "../../components/Shared/Form/InputField";

const ForgetPassword = () => {
  useTitle("Reset Password");
  const { resetPassword } = useAuth();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();

  const [processing, setProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (location.state?.email) {
      setValue("email", location.state.email);
    }
  }, [location.state, setValue]);

  const onSubmit = async (data) => {
    setProcessing(true);
    try {
      // Check if user exists in MongoDB
      const res = await axiosPublic.get(`/users/${data.email}`);

      if (!res.data) {
        throw new Error("User not found in our records.");
      }

      await resetPassword(data.email);

      toast.success("Reset link sent! Please check your inbox.");
    } catch (error) {
      if (error.message === "User not found in our records.") {
        toast.error("This email is not registered with us.");
      } else {
        const msg =
          error.code === "auth/user-not-found"
            ? "No account found."
            : "Failed to send reset link.";
        toast.error(msg);
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 bg-base-200 transition-colors duration-300 min-h-[60vh]">
      {/* --- Header --- */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-gradient mb-2">
          Forgot Password?
        </h1>
        <p className="text-base-content/70 font-medium">
          Enter your email to receive a reset link
        </p>
      </div>

      {/* --- Card --- */}
      <div className="card w-full max-w-sm shadow-2xl bg-base-100 border border-base-200">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

            {/* Submit Button */}
            <div className="form-control">
              <button
                disabled={processing}
                className="btn btn-gradient w-full text-white font-bold text-lg shadow-lg disabled:opacity-70"
              >
                {processing ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </div>
          </form>

          {/* Back to Login Link */}
          <p className="text-center text-sm mt-6 text-base-content/60">
            Remember your password?{" "}
            <Link to="/login" className="link link-primary font-bold">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
