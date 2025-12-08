import React from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useTitle from "../../../hooks/useTitle";

const Profile = () => {
  useTitle("Profile");
  const { user } = useAuth();
  const [role] = useRole();

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-black text-gradient mb-8">
        My Profile
      </h2>

      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="card-body items-center text-center py-10">
          <div className="avatar mb-4">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={user?.photoURL} alt="Profile" />
            </div>
          </div>
          
          <h2 className="card-title text-2xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-500">{user?.email}</p>
          
          <div className="mt-4 badge badge-lg badge-primary capitalize">
            {role || "Loading..."}
          </div>

          <div className="divider"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left mt-4">
            <div>
              <label className="label text-gray-500 font-semibold">Full Name</label>
              <div className="p-3 bg-base-200 rounded-lg">{user?.displayName}</div>
            </div>
            <div>
              <label className="label text-gray-500 font-semibold">Email Address</label>
              <div className="p-3 bg-base-200 rounded-lg">{user?.email}</div>
            </div>
            <div>
              <label className="label text-gray-500 font-semibold">User ID</label>
              <div className="p-3 bg-base-200 rounded-lg truncate">{user?.uid}</div>
            </div>
            <div>
              <label className="label text-gray-500 font-semibold">Last Login</label>
              <div className="p-3 bg-base-200 rounded-lg">
                {user?.metadata?.lastSignInTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;