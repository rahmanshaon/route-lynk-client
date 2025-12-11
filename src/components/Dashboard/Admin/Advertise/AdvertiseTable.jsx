import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const AdvertiseTable = ({ tickets, onToggle }) => {
  return (
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-base-200 shadow-xl bg-base-100">
      <table className="table w-full align-middle">
        {/* Head */}
        <thead className="bg-base-200/60 text-base-content/70 uppercase text-xs font-bold tracking-wider backdrop-blur-sm">
          <tr>
            <th className="py-5 pl-6">Ticket Details</th>
            <th>Route info</th>
            <th>Price</th>
            <th>Status</th>
            <th className="text-center pr-6">Action</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-base-200">
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="hover:bg-base-200/40 transition-colors duration-200">
              
              {/* Ticket Info */}
              <td className="pl-6">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12 bg-base-300">
                      <img src={ticket.image} alt={ticket.title} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-base-content line-clamp-1">{ticket.title}</div>
                    <div className="text-xs text-base-content/50 font-medium">
                        {ticket.transportType || "Bus"}
                    </div>
                  </div>
                </div>
              </td>

              {/* Route */}
              <td>
                <div className="flex flex-col text-xs gap-1">
                   <div className="flex items-center gap-1 font-bold text-base-content/70">
                        <FaMapMarkerAlt className="text-primary text-[10px]" />
                        {ticket.from} <span className="text-primary">→</span> {ticket.to}
                   </div>
                   <span className="text-base-content/50 pl-4">{ticket.departureDate}</span>
                </div>
              </td>

              {/* Price */}
              <td>
                <span className="font-black text-primary text-sm">৳{ticket.price}</span>
              </td>

              {/* Status Text */}
              <td>
                {ticket.isAdvertised ? (
                    <span className="badge badge-sm badge-success text-white font-bold">Live</span>
                ) : (
                    <span className="badge badge-sm badge-ghost text-base-content/50 font-bold">Inactive</span>
                )}
              </td>

              {/* Toggle Switch */}
              <td className="text-center pr-6">
                <div className="tooltip" data-tip={ticket.isAdvertised ? "Turn Off" : "Turn On"}>
                    <input
                        type="checkbox"
                        className={`toggle toggle-sm ${ticket.isAdvertised ? 'toggle-success' : 'toggle-base-300'}`}
                        checked={ticket.isAdvertised || false}
                        onChange={() => onToggle(ticket._id, ticket.isAdvertised)}
                    />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdvertiseTable;