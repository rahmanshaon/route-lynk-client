import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaInbox } from "react-icons/fa";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../components/Shared/Loader";

// Import Components
import BookingRequestTable from "../../../components/Dashboard/Vendor/Bookings/BookingRequestTable";
import BookingRequestCardGrid from "../../../components/Dashboard/Vendor/Bookings/BookingRequestCardGrid";

const RequestedBookings = () => {
  useTitle("Booking Requests");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Requests
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vendor-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/vendor/${user?.email}`);
      return res.data;
    },
  });

  // Handle Status Change
  const handleStatus = (id, newStatus) => {
    Swal.fire({
      title: `Confirm ${
        newStatus === "accepted" ? "Acceptance" : "Rejection"
      }?`,
      text: `You are about to ${newStatus} this booking request.`,
      icon: newStatus === "accepted" ? "question" : "warning",
      showCancelButton: true,
      confirmButtonColor: newStatus === "accepted" ? "#36d399" : "#f87272",
      cancelButtonColor: "#3d4451",
      confirmButtonText: `Yes, ${newStatus} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/bookings/status/${id}`, {
            status: newStatus,
          });
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Success!",
              text: `Booking has been ${newStatus}.`,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to update status", "error");
        }
      }
    });
  };

  // Stats Logic
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  if (isLoading) return <Loader message="Loading Booking Requests..." />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* --- Page Header --- */}
      <div className="flex items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-4xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Booking Requests
          </h2>
          <p className="text-base-content/60 font-medium text-sm md:text-base mt-1">
            Pending Actions:{" "}
            <span
              className={`${
                pendingCount > 0 ? "text-warning" : "text-success"
              } font-bold`}
            >
              {pendingCount}
            </span>
          </p>
        </div>
      </div>

      {requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-300 text-center">
          <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-4">
            <FaInbox className="text-4xl text-base-content/20" />
          </div>
          <h3 className="text-xl font-bold text-base-content/70">
            No Requests Yet
          </h3>
          <p className="text-sm text-base-content/50 mt-1">
            When users book your tickets, they will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop View */}
          <BookingRequestTable requests={requests} onAction={handleStatus} />

          {/* Mobile View */}
          <BookingRequestCardGrid requests={requests} onAction={handleStatus} />
        </>
      )}
    </div>
  );
};

export default RequestedBookings;
