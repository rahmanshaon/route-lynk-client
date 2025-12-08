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
  FaChair,
  FaArrowRight,
  FaTicketAlt,
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

  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    approved: "bg-green-100 text-green-700 border-green-200",
    rejected: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <div className="group relative bg-base-100 rounded-2xl shadow-md border border-base-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* --- Image Section --- */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>

        {/* Status Badge (Only show for Vendor/Admin) */}
        {!isPublic && (
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border shadow-sm ${statusStyles[status]}`}
          >
            {status}
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur text-gray-800 px-3 py-1 rounded-md text-[10px] font-bold flex items-center gap-2 shadow-sm uppercase tracking-wider">
          <span className="text-primary text-sm">{icons[transportType]}</span>
          {transportType}
        </div>

        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3
            className="font-bold text-lg leading-tight drop-shadow-md truncate"
            title={title}
          >
            {title}
          </h3>
        </div>
      </div>

      {/* --- Body Section --- */}
      <div className="p-5 flex flex-col gap-5 flex-1">
        {/* Route Grid */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
          <div className="flex flex-col items-start min-w-0">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              From
            </span>
            <span
              className="font-bold text-gray-800 text-base truncate w-full"
              title={from}
            >
              {from}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center px-2 text-gray-300 mt-2">
            <span className="border-b-2 border-dashed border-gray-300 w-8 mb-0.5"></span>
            <FaArrowRight className="text-primary text-xs" />
          </div>
          <div className="flex flex-col items-end min-w-0">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              To
            </span>
            <span
              className="font-bold text-gray-800 text-base truncate w-full text-right"
              title={to}
            >
              {to}
            </span>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-base-200/50 rounded-xl border border-base-200 p-2">
          <div className="grid grid-cols-2 items-center relative">
            <div className="flex items-center gap-3 pr-4">
              <div className="p-2 bg-white rounded-lg text-primary shadow-sm">
                <FaCalendarAlt />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  Departure
                </span>
                <span className="text-xs font-bold text-gray-700 truncate">
                  {departureDate}
                </span>
              </div>
            </div>
            <div className="absolute left-1/2 top-1 bottom-1 w-px bg-gray-300 -ml-[0.5px]"></div>
            <div className="flex items-center justify-end gap-3 pl-4">
              <div className="flex flex-col items-end min-w-0">
                <span className="text-[10px] text-gray-400 font-bold uppercase">
                  Time
                </span>
                <span className="text-xs font-bold text-gray-700 truncate">
                  {departureTime}
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg text-orange-500 shadow-sm">
                <FaClock />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-dashed border-gray-200 my-1 relative">
          <div className="absolute -left-7 -top-3 w-4 h-6 bg-base-200 rounded-r-full"></div>
          <div className="absolute -right-7 -top-3 w-4 h-6 bg-base-200 rounded-l-full"></div>
        </div>

        {/* Price & Seats */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-medium">
              Price per person
            </span>
            <span className="text-2xl font-black text-gradient">৳{price}</span>
          </div>
          <div className="flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
            <FaChair className="text-primary text-sm" />
            <span className="font-bold text-gray-700 text-sm">{quantity}</span>
            <span className="text-[10px] text-gray-400 uppercase font-semibold">
              Seats
            </span>
          </div>
        </div>
      </div>

      {/* --- Footer Actions (Dynamic) --- */}
      <div
        className={`grid ${
          isPublic ? "grid-cols-1" : "grid-cols-2 divide-x divide-gray-200"
        } border-t border-gray-200 bg-gray-50`}
      >
        {isPublic ? (
          <Link
            to={`/ticket/${_id}`}
            className="py-3 flex items-center justify-center gap-2 text-sm font-bold text-white bg-primary hover:bg-blue-700 transition-colors w-full"
          >
            <FaTicketAlt /> View Details & Book
          </Link>
        ) : (
          <>
            <button
              disabled={status === "rejected"}
              className="py-3 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary hover:bg-white transition-colors disabled:opacity-50"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => handleDelete(_id)}
              disabled={status === "rejected"}
              className="py-3 flex items-center justify-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              <FaTrash /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
