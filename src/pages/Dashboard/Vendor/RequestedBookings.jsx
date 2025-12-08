import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";

const RequestedBookings = () => {
  useTitle("Booking Requests");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["vendor-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/vendor/${user?.email}`);
      return res.data;
    },
  });

  const handleStatus = (id, newStatus) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${newStatus} this booking?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${newStatus} it!`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/bookings/status/${id}`, { status: newStatus });
          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", `Booking has been ${newStatus}.`, "success");
            refetch();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to update status", "error");
        }
      }
    });
  };

  if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div>
      <h2 className="text-3xl font-black text-gradient mb-8">Requested Bookings</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
        <table className="table">
          <thead className="bg-base-200 text-gray-600 uppercase text-xs">
            <tr>
              <th>User</th>
              <th>Ticket Details</th>
              <th>Qty / Total</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id}>
                <td>
                  <div className="font-bold">{req.userName}</div>
                  <div className="text-xs text-gray-400">{req.userEmail}</div>
                </td>
                <td>
                  <div className="font-bold text-sm truncate max-w-[150px]">{req.ticketTitle}</div>
                  <div className="text-xs text-gray-500">{req.departureDate}</div>
                </td>
                <td>
                  <div className="font-bold">{req.quantity} Seats</div>
                  <div className="text-xs text-primary font-bold">৳{req.totalPrice}</div>
                </td>
                <td>
                   <span className={`badge badge-sm uppercase font-bold text-white ${
                      req.status === 'accepted' ? 'badge-success' : 
                      req.status === 'rejected' ? 'badge-error' : 
                      'badge-warning'
                   }`}>
                      {req.status}
                   </span>
                </td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => handleStatus(req._id, "accepted")}
                      disabled={req.status !== "pending"}
                      className="btn btn-xs btn-success text-white disabled:opacity-30"
                      title="Accept"
                    >
                      <FaCheck />
                    </button>
                    <button 
                      onClick={() => handleStatus(req._id, "rejected")}
                      disabled={req.status !== "pending"}
                      className="btn btn-xs btn-error text-white disabled:opacity-30"
                      title="Reject"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
                <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-400">No booking requests found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedBookings;