import React from "react";
import {
  FaCheck,
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const TicketCardGrid = ({ tickets, onStatusUpdate }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {tickets.map((ticket) => {
        // Helper to check if action is already taken
        const isCompleted =
          ticket.status === "approved" || ticket.status === "rejected";

        return (
          <div
            key={ticket._id}
            className="card bg-base-100 shadow-lg border border-base-200 overflow-hidden group"
          >
            {/* Status Indicator Bar */}
            <div
              className={`h-1.5 w-full ${
                ticket.status === "approved"
                  ? "bg-success"
                  : ticket.status === "rejected"
                  ? "bg-error"
                  : "bg-warning"
              }`}
            ></div>

            <div className="card-body p-4">
              {/* Header: Image & Title */}
              <div className="flex gap-3 items-start">
                <img
                  src={ticket.image}
                  alt={ticket.title}
                  className="w-16 h-16 rounded-lg object-cover bg-base-300 shadow-sm"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base-content text-lg line-clamp-1">
                    {ticket.title}
                  </h3>
                  <p className="text-xs text-base-content/50 font-medium">
                    {ticket.vendor?.name}
                  </p>
                  <span
                    className={`badge badge-xs mt-2 font-bold uppercase text-white border-none shadow-sm ${
                      ticket.status === "approved"
                        ? "bg-success"
                        : ticket.status === "rejected"
                        ? "bg-error"
                        : "bg-warning"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-primary">
                    ৳{ticket.price}
                  </p>
                  <p className="text-[10px] text-base-content/50">
                    {ticket.quantity} seats
                  </p>
                </div>
              </div>

              <div className="divider my-2"></div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-base-content/40 flex items-center gap-1">
                    <FaMapMarkerAlt /> Route
                  </span>
                  <span className="font-bold text-base-content/70 truncate">
                    {ticket.from} → {ticket.to}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[10px] uppercase font-bold text-base-content/40 flex items-center justify-end gap-1">
                    <FaCalendarAlt /> Date
                  </span>
                  <span className="font-bold text-base-content/70">
                    {ticket.departureDate}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                {/* Approve Button */}
                <button
                  onClick={() => onStatusUpdate(ticket._id, "approved")}
                  disabled={isCompleted}
                  className={`btn btn-sm w-full font-bold shadow-sm ${
                    isCompleted
                      ? "bg-base-200 text-base-content/20 border-base-200" // Disabled Style
                      : "bg-success/10 text-success border-success/20 hover:bg-success hover:text-white" // Active Style
                  }`}
                >
                  <FaCheck /> Approve
                </button>

                {/* Reject Button */}
                <button
                  onClick={() => onStatusUpdate(ticket._id, "rejected")}
                  disabled={isCompleted}
                  className={`btn btn-sm w-full font-bold shadow-sm ${
                    isCompleted
                      ? "bg-base-200 text-base-content/20 border-base-200" // Disabled Style
                      : "bg-error/10 text-error border-error/20 hover:bg-error hover:text-white" // Active Style
                  }`}
                >
                  <FaTimes /> Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketCardGrid;
