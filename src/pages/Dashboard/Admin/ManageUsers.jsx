import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserShield, FaUserTie, FaBan, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";

const ManageUsers = () => {
  useTitle("Manage Users");
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Handle Make Admin / Make Vendor
  const handleRoleChange = (user, newRole) => {
    Swal.fire({
      title: `Promote to ${newRole}?`,
      text: `${user.name} will have ${newRole} privileges.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Promote",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/role/${user._id}`, { role: newRole });
          if (res.data.modifiedCount > 0) {
            Swal.fire("Success!", `${user.name} is now a ${newRole}.`, "success");
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to update role.", "error");
        }
      }
    });
  };

  // Handle Mark as Fraud
  const handleFraud = (user) => {
    Swal.fire({
      title: "Mark as Fraud?",
      text: "This will ban the vendor and remove ALL their tickets!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, Mark Fraud",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/fraud/${user._id}`, { email: user.email });
          if (res.data.userResult.modifiedCount > 0) {
            Swal.fire("Banned!", "Vendor marked as fraud and tickets hidden.", "success");
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to execute action.", "error");
        }
      }
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-black text-gradient mb-6">Manage Users</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
        <table className="table">
          <thead className="bg-base-200 text-gray-600 uppercase text-xs">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-base-50">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img src={user.image || "https://i.ibb.co/wZQG7SwS/user.png"} alt="User" />
                      </div>
                    </div>
                    <div className="font-bold">{user.name}</div>
                  </div>
                </td>
                <td className="text-sm text-gray-500">{user.email}</td>
                <td>
                  <span className={`badge badge-sm uppercase font-bold text-white ${
                    user.role === 'admin' ? 'badge-primary' : 
                    user.role === 'vendor' ? 'badge-secondary' : 
                    user.role === 'fraud' ? 'badge-error' : 
                    'badge-ghost text-gray-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="flex justify-center gap-2">
                  {user.role === "fraud" ? (
                    <span className="text-error font-bold text-xs flex items-center gap-1">
                        <FaBan /> BANNED
                    </span>
                  ) : (
                    <>
                        {/* Make Vendor */}
                        {user.role === "user" && (
                            <button 
                                onClick={() => handleRoleChange(user, "vendor")}
                                className="btn btn-xs btn-outline btn-secondary"
                                title="Make Vendor"
                            >
                                <FaUserTie /> Vendor
                            </button>
                        )}

                        {/* Make Admin */}
                        {user.role !== "admin" && (
                            <button 
                                onClick={() => handleRoleChange(user, "admin")}
                                className="btn btn-xs btn-outline btn-primary"
                                title="Make Admin"
                            >
                                <FaUserShield /> Admin
                            </button>
                        )}

                        {/* Mark Fraud (Only for Vendors) */}
                        {user.role === "vendor" && (
                            <button 
                                onClick={() => handleFraud(user)}
                                className="btn btn-xs btn-error text-white"
                                title="Mark as Fraud"
                            >
                                <FaBan /> Fraud
                            </button>
                        )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;