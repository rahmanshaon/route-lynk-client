import React from "react";
import { FaCheck, FaTimes, FaBus, FaTrain, FaShip, FaPlane } from "react-icons/fa";

const TicketTable = ({ tickets, onStatusUpdate }) => {
  // Helper for Icons
  const getTransportIcon = (type) => {
    const t = type?.toLowerCase() || "bus";
    if (t.includes("flight") || t.includes("plane")) return <FaPlane />;
    if (t.includes("train") || t.includes("rail")) return <FaTrain />;
    if (t.includes("ship") || t.includes("launch")) return <FaShip />;
    return <FaBus />;
  };

  return (
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-base-200 shadow-xl bg-base-100">
      <table className="table w-full align-middle">
        {/* Table Header */}
        <thead className="bg-base-200/60 text-base-content/70 uppercase text-xs font-bold tracking-wider backdrop-blur-sm">
          <tr>
            <th className="py-5 pl-6">#</th>
            <th>Ticket Info</th>
            <th>Vendor</th>
            <th>Route & Date</th>
            <th>Price / Qty</th>
            <th>Status</th>
            <th className="text-center pr-6">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-base-200">
          {tickets.map((ticket, index) => (
            <tr key={ticket._id} className="hover:bg-base-200/40 transition-colors duration-200">
              <th className="pl-6 text-base-content/50">{index + 1}</th>

              {/* Ticket Info */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12 bg-base-300">
                      <img src={ticket.image} alt={ticket.title} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold max-w-[150px] truncate text-base-content" title={ticket.title}>
                      {ticket.title}
                    </div>
                    <div className="text-xs text-base-content/50 flex items-center gap-1 capitalize font-medium">
                      <span className="text-primary">{getTransportIcon(ticket.transportType)}</span>
                      {ticket.transportType || "Bus"}
                    </div>
                  </div>
                </div>
              </td>

              {/* Vendor */}
              <td>
                <div className="font-bold text-xs text-base-content/80">{ticket.vendor?.name}</div>
                <div className="text-[10px] text-base-content/50 font-mono">{ticket.vendor?.email}</div>
              </td>

              {/* Route */}
              <td>
                <div className="flex flex-col text-xs">
                  <span className="font-bold text-base-content/70">
                    {ticket.from} <span className="text-primary">→</span> {ticket.to}
                  </span>
                  <span className="text-base-content/50 mt-0.5">{ticket.departureDate}</span>
                </div>
              </td>

              {/* Price */}
              <td className="text-xs">
                <div className="font-black text-primary text-sm">৳{ticket.price}</div>
                <div className="text-base-content/50 font-medium">{ticket.quantity} seats</div>
              </td>

              {/* Status Badge */}
              <td>
                <span
                  className={`badge badge-sm font-bold uppercase border-none text-white ${
                    ticket.status === "approved"
                      ? "badge-success"
                      : ticket.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {ticket.status}
                </span>
              </td>

              {/* --- IMPROVED ACTIONS UI --- */}
              <td className="pr-6">
                <div className="flex justify-center items-center gap-3">
                   
                   {/* Approve Button */}
                   <div className="tooltip" data-tip="Approve">
                      <button
                        onClick={() => onStatusUpdate(ticket._id, "approved")}
                        disabled={ticket.status === "approved" || ticket.status === "rejected"}
                        className="btn btn-sm btn-square btn-success text-white shadow-md shadow-success/20 hover:scale-110 transition-transform disabled:bg-base-200 disabled:text-base-content/20 disabled:shadow-none"
                      >
                        <FaCheck />
                      </button>
                   </div>

                   {/* Reject Button */}
                   <div className="tooltip" data-tip="Reject">
                      <button
                        onClick={() => onStatusUpdate(ticket._id, "rejected")}
                        disabled={ticket.status === "approved" || ticket.status === "rejected"}
                        className="btn btn-sm btn-square btn-error text-white shadow-md shadow-error/20 hover:scale-110 transition-transform disabled:bg-base-200 disabled:text-base-content/20 disabled:shadow-none"
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

export default TicketTable;