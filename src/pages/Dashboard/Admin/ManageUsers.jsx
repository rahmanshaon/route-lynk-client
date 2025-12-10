import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import UserTable from "../../../components/Dashboard/Admin/ManageUsers/UserTable";
import UserCardGrid from "../../../components/Dashboard/Admin/ManageUsers/UserCardGrid";

const ManageUsers = () => {
  useTitle("Manage Users");
  const axiosSecure = useAxiosSecure();
  const { user: currentUser } = useAuth();

  // --- Data Fetching ---
  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // --- Promote Role ---
  const handleRoleChange = (user, newRole) => {
    Swal.fire({
      title: `Promote to ${newRole}?`,
      text: `${user.name} will be given ${newRole} access.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Promote",
      background: "#1d232a",
      color: "#fff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/role/${user._id}`, {
            role: newRole,
          });
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: `${user.name} is now a ${newRole}.`,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to update role.", "error");
        }
      }
    });
  };

  // --- Mark Fraud ---
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
          const res = await axiosSecure.patch(`/users/fraud/${user._id}`, {
            email: user.email,
          });
          if (res.data.userResult.modifiedCount > 0) {
            Swal.fire("Banned!", "Vendor marked as fraud.", "success");
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to execute action.", "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent inline-block">
          Manage Users
        </h2>
        <p className="text-base-content/60 mt-1 font-medium">
          Total Users: <span className="text-primary">{users.length}</span>
        </p>
      </div>

      {/* Responsive Views (Desktop vs Mobile) */}
      <UserTable
        users={users}
        currentUser={currentUser}
        onPromote={handleRoleChange}
        onFraud={handleFraud}
      />

      <UserCardGrid
        users={users}
        currentUser={currentUser}
        onPromote={handleRoleChange}
        onFraud={handleFraud}
      />
    </div>
  );
};

export default ManageUsers;
