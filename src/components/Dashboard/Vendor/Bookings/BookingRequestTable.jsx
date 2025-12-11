import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const BookingRequestTable = ({ requests, onAction }) => {
  return (
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-base-200 shadow-xl bg-base-100">
      <table className="table w-full align-middle">
        {/* Header */}
        <thead className="bg-base-200/60 text-base-content/70 uppercase text-xs font-bold tracking-wider backdrop-blur-sm">
          <tr>
            <th className="py-5 pl-6">User Details</th>
            <th>Ticket Info</th>
            <th>Booking Details</th>
            <th>Status</th>
            <th className="text-center pr-6">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-base-200">
          {requests.map((req) => (
            <tr
              key={req._id}
              className="hover:bg-base-200/40 transition-colors duration-200"
            >
              {/* User Info */}
              <td className="pl-6">
                <div className="flex flex-col">
                  <div className="font-bold text-base-content text-sm">
                    {req.userName}
                  </div>
                  <div className="text-xs text-base-content/50 font-medium">
                    {req.userEmail}
                  </div>
                </div>
              </td>

              {/* Ticket Info */}
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src={req.image}
                    alt="ticket"
                    className="w-10 h-10 rounded-md object-cover bg-base-300"
                  />
                  <div>
                    <div
                      className="font-bold text-sm text-base-content line-clamp-1 max-w-[150px]"
                      title={req.ticketTitle}
                    >
                      {req.ticketTitle}
                    </div>
                    <div className="text-xs text-base-content/50">
                      {req.departureDate}
                    </div>
                  </div>
                </div>
              </td>

              {/* Qty / Price */}
              <td>
                <div className="font-bold text-base-content/80 text-sm">
                  {req.quantity} Seats
                </div>
                <div className="font-black text-primary text-xs">
                  ৳{req.totalPrice}
                </div>
              </td>

              {/* Status Badge */}
              <td>
                <span
                  className={`badge badge-sm uppercase font-bold text-white border-none ${
                    req.status === "accepted"
                      ? "badge-success"
                      : req.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {req.status}
                </span>
              </td>

              <td className="pr-6">
                <div className="flex justify-center items-center gap-3">
                  {/* Accept Button */}
                  <div className="tooltip" data-tip="Accept">
                    <button
                      onClick={() => onAction(req._id, "accepted")}
                      disabled={req.status !== "pending"}
                      className="btn btn-sm btn-square btn-success text-white shadow-md shadow-success/20 hover:scale-110 transition-transform disabled:bg-base-200 disabled:text-base-content/20 disabled:shadow-none border-none"
                    >
                      <FaCheck />
                    </button>
                  </div>

                  {/* Reject Button */}
                  <div className="tooltip" data-tip="Reject">
                    <button
                      onClick={() => onAction(req._id, "rejected")}
                      disabled={req.status !== "pending"}
                      className="btn btn-sm btn-square btn-error text-white shadow-md shadow-error/20 hover:scale-110 transition-transform disabled:bg-base-200 disabled:text-base-content/20 disabled:shadow-none border-none"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingRequestTable;
