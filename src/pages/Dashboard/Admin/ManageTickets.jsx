import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaCheck,
  FaTimes,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";

const ManageTickets = () => {
  useTitle("Manage Tickets");
  const axiosSecure = useAxiosSecure();

  // Fetch All Tickets
  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-tickets-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/admin");
      return res.data;
    },
  });

  // Handle Status Update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/tickets/status/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `Ticket ${newStatus}!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  const icons = {
    bus: <FaBus />,
    flight: <FaPlane />,
    train: <FaTrain />,
    launch: <FaShip />,
  };

  if (isLoading)
    return (
      <div className="text-center mt-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  return (
    <div>
      <h2 className="text-3xl font-black text-gradient mb-6">Manage Tickets</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
        <table className="table">
          {/* Head */}
          <thead className="bg-base-200 text-gray-600 uppercase text-xs">
            <tr>
              <th>#</th>
              <th>Ticket Info</th>
              <th>Vendor</th>
              <th>Route & Date</th>
              <th>Price/Qty</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {tickets.map((ticket, index) => (
              <tr
                key={ticket._id}
                className="hover:bg-base-50 transition-colors border-b border-base-100 last:border-none"
              >
                {/* Index */}
                <th>{index + 1}</th>

                {/* Info (Image + Title) */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={ticket.image} alt={ticket.title} />
                      </div>
                    </div>
                    <div>
                      <div
                        className="font-bold max-w-[150px] truncate"
                        title={ticket.title}
                      >
                        {ticket.title}
                      </div>
                      <div className="text-xs opacity-50 flex items-center gap-1 capitalize">
                        {icons[ticket.transportType]} {ticket.transportType}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Vendor Info */}
                <td>
                  <div className="font-medium text-xs">
                    {ticket.vendor?.name}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {ticket.vendor?.email}
                  </div>
                </td>

                {/* Route */}
                <td>
                  <div className="flex flex-col text-xs">
                    <span className="font-semibold">
                      {ticket.from} → {ticket.to}
                    </span>
                    <span className="text-gray-400">
                      {ticket.departureDate}
                    </span>
                  </div>
                </td>

                {/* Price/Qty */}
                <td className="text-xs">
                  <div className="font-bold">৳{ticket.price}</div>
                  <div className="opacity-70">{ticket.quantity} seats</div>
                </td>

                {/* Status Badge */}
                <td>
                  <span
                    className={`badge badge-sm font-bold capitalize ${
                      ticket.status === "approved"
                        ? "badge-success text-white"
                        : ticket.status === "rejected"
                        ? "badge-error text-white"
                        : "badge-warning text-white"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleStatusUpdate(ticket._id, "approved")}
                      disabled={
                        ticket.status === "approved" ||
                        ticket.status === "rejected"
                      }
                      className="btn btn-xs btn-success text-white disabled:opacity-30"
                      title="Approve"
                    >
                      <FaCheck />
                    </button>

                    <button
                      onClick={() => handleStatusUpdate(ticket._id, "rejected")}
                      disabled={
                        ticket.status === "approved" ||
                        ticket.status === "rejected"
                      }
                      className="btn btn-xs btn-error text-white disabled:opacity-30"
                      title="Reject"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {tickets.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No tickets found to manage.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageTickets;
