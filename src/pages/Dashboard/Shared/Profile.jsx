import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEnvelope, FaCalendarAlt, FaUserTag, FaIdCard } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import { formatDate } from "../../../utils/dateFormatter";
import Loader from "../../../components/Shared/Loader";

const Profile = () => {
  useTitle("Profile");
  const { user: authUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  // --- Fetch User Data from Database ---
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["profile", authUser?.email],
    enabled: !!authUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${authUser.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader message="Loading Profile..." />;
  }

  // Fallback
  const displayImage = userProfile?.image || authUser?.photoURL;
  const displayName = userProfile?.name || authUser?.displayName;
  const displayEmail = userProfile?.email || authUser?.email;
  const displayRole = userProfile?.role || "User";
  const displayId = userProfile?._id || "N/A";

  const joinDate = userProfile?.timestamp
    ? formatDate(userProfile.timestamp)
    : "N/A";
  const lastLoginDate = userProfile?.lastLogin
    ? formatDate(userProfile.lastLogin, true)
    : "N/A";

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      
      {/* --- Page Header --- */}
      <h2 className="text-3xl md:text-4xl font-black text-gradient mb-8 text-center md:text-left">
        My Profile
      </h2>

      {/* --- Main Card --- */}
      <div className="card w-full bg-base-100 shadow-xl border border-base-200 overflow-hidden rounded-2xl">
        
        {/* Header Banner */}
        <div className="h-32 md:h-40 bg-linear-to-r from-primary via-secondary to-accent relative opacity-90">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Content Section */}
        <div className="card-body pt-0 px-5 md:px-8 pb-8">
          {/* Avatar & Identity */}
          <div className="flex flex-col items-center -mt-12 md:-mt-16 mb-6">
            <div className="avatar placeholder">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full ring-4 ring-base-100 shadow-xl bg-base-200 overflow-hidden">
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt="Profile"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-base-content/20 uppercase">
                    {displayName?.charAt(0) || "U"}
                  </span>
                )}
              </div>
            </div>

            {/* Name & Role */}
            <div className="text-center mt-3">
              <h2 className="text-2xl md:text-3xl font-black text-gradient">
                {displayName || "Unknown User"}
              </h2>

              {/* Unified Role Badge */}
              <div className="mt-2 badge badge-md md:badge-lg badge-primary font-bold uppercase tracking-wider shadow-sm">
                {displayRole}
              </div>
            </div>
          </div>

          <div className="divider my-0 mb-6 opacity-50 text-xs uppercase tracking-widest font-semibold">
            Account Details
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-base-200/40 border border-base-200 hover:bg-base-200 transition-colors">
              <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-600">
                <FaEnvelope size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs font-bold text-base-content/50 uppercase tracking-wider mb-0.5">
                  Email Address
                </p>
                <p
                  className="text-sm md:text-base font-semibold truncate text-base-content"
                  title={displayEmail}
                >
                  {displayEmail}
                </p>
              </div>
            </div>

            {/* User ID */}
            <div className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-base-200/40 border border-base-200 hover:bg-base-200 transition-colors">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-600">
                <FaIdCard size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs font-bold text-base-content/50 uppercase tracking-wider mb-0.5">
                  User UID
                </p>
                <p
                  className="text-xs md:text-sm font-mono font-medium truncate text-base-content/70"
                  title={displayId}
                >
                  {displayId}
                </p>
              </div>
            </div>

            {/* Joined Date */}
            <div className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-base-200/40 border border-base-200 hover:bg-base-200 transition-colors">
              <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-600">
                <FaCalendarAlt size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs font-bold text-base-content/50 uppercase tracking-wider mb-0.5">
                  Joined On
                </p>
                <p className="text-sm md:text-base font-semibold text-base-content">
                  {joinDate}
                </p>
              </div>
            </div>

            {/* Last Login */}
            <div className="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-base-200/40 border border-base-200 hover:bg-base-200 transition-colors">
              <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-600">
                <FaUserTag size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] md:text-xs font-bold text-base-content/50 uppercase tracking-wider mb-0.5">
                  Last Login
                </p>
                <p className="text-sm md:text-base font-semibold text-base-content">
                  {lastLoginDate}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;