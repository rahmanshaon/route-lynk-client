import React from "react";
import {
  FaEdit,
  FaTrash,
  FaBus,
  FaPlane,
  FaTrain,
  FaShip,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router";

const TicketCard = ({ ticket, handleDelete, isPublic = false }) => {
  const {
    _id,
    title,
    from,
    to,
    transportType,
    price,
    quantity,
    departureDate,
    departureTime,
    status,
    image,
  } = ticket;

  const icons = {
    bus: <FaBus />,
    flight: <FaPlane />,
    train: <FaTrain />,
    launch: <FaShip />,
  };

  // Status Colors
  const statusStyles = {
    pending: "badge-warning text-white",
    approved: "badge-success text-white",
    rejected: "badge-error text-white",
  };

  return (
    <div className="group relative flex flex-col h-full bg-base-100 rounded-2xl border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* --- Image Header --- */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>

        {/* Transport Type */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-base-100/90 backdrop-blur text-base-content text-xs font-bold uppercase flex items-center gap-2 shadow-sm">
          <span className="text-primary text-sm">{icons[transportType]}</span>
          {transportType}
        </div>

        {/* Status Badge (Vendor View) */}
        {!isPublic && (
          <div
            className={`absolute top-3 right-3 badge ${statusStyles[status]} font-bold uppercase border-none shadow-sm`}
          >
            {status}
          </div>
        )}
      </div>

      {/* --- Card Body --- */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div>
          <h3
            className="text-xl font-black text-gradient text-center line-clamp-1 mb-3"
            title={title}
          >
            {title}
          </h3>

          {/* Route Grid */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-base-200/50 border border-base-200">
            <div className="flex flex-col min-w-0 w-[40%]">
              <span className="text-[10px] uppercase font-bold text-base-content/50">
                From
              </span>
              <span
                className="font-bold text-base-content truncate"
                title={from}
              >
                {from}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center w-[20%] text-primary/50">
              <FaArrowRight className="text-sm" />
            </div>

            <div className="flex flex-col items-end min-w-0 w-[40%]">
              <span className="text-[10px] uppercase font-bold text-base-content/50">
                To
              </span>
              <span
                className="font-bold text-base-content truncate text-right"
                title={to}
              >
                {to}
              </span>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-base-content/70">
            <FaCalendarAlt className="text-primary" />
            <span className="font-medium text-xs sm:text-sm">
              {departureDate}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 text-base-content/70">
            <FaClock className="text-orange-500" />
            <span className="font-medium text-xs sm:text-sm">
              {departureTime}
            </span>
          </div>
        </div>

        <div className="border-t border-dashed border-base-300 my-1"></div>

        {/* Footer Info */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p className="text-[10px] font-bold text-base-content/50 uppercase">
              Ticket Price
            </p>
            <p className="text-xl font-black text-primary">৳ {price}</p>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-bold text-base-content/50 uppercase">
              Available Seats
            </p>
            <p className="text-xl font-black text-primary">{quantity}</p>
          </div>
        </div>
      </div>

      {/* --- Actions --- */}
      <div className="p-4 bg-base-200/30 border-t border-base-200">
        {isPublic ? (
          <Link
            to={`/ticket/${_id}`}
            className="btn btn-gradient w-full min-h-0 h-10 rounded-xl border-none text-white font-bold"
          >
            Book Now
          </Link>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Link
              to={`/dashboard/edit-ticket/${_id}`}
              state={{ ticket }}
              className={`btn btn-sm btn-outline border-primary/20 text-primary hover:bg-primary  hover:text-white font-bold ${
                status === "rejected" ? "btn-disabled" : ""
              }`}
            >
              <FaEdit /> Edit
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              disabled={status === "rejected"}
              className="btn btn-sm btn-outline border-error/20 text-error hover:bg-error hover:text-white font-bold"
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
