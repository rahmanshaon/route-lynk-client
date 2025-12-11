import React from "react";
import {
  FaEdit,
  FaTrashAlt,
  FaBus,
  FaPlane,
  FaTrain,
  FaShip,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router";

const TicketCard = ({
  ticket,
  handleDelete,
  isPublic = false,
  isFeatured = false,
}) => {
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
    perks,
  } = ticket;

  const getTransportIcon = (type) => {
    const t = type?.toLowerCase() || "bus";
    if (t.includes("flight") || t.includes("plane")) return <FaPlane />;
    if (t.includes("train") || t.includes("rail")) return <FaTrain />;
    if (t.includes("ship") || t.includes("launch")) return <FaShip />;
    return <FaBus />;
  };

  const getStatusBadge = () => {
    if (status === "approved") return "badge-success text-white";
    if (status === "rejected") return "badge-error text-white";
    return "badge-warning text-white";
  };

  return (
    <div
      className={`group relative flex flex-col h-full bg-base-100 rounded-2xl border transition-all duration-300 overflow-hidden 
      ${
        isFeatured
          ? "border-primary/40 shadow-lg shadow-primary/10 hover:shadow-primary/20"
          : "border-base-200 shadow-sm hover:shadow-xl"
      }`}
    >
      {/* --- Image Section --- */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent"></div>

        <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-base-100/90 backdrop-blur-md border border-white/20 shadow-sm flex items-center gap-2">
          <span className="text-primary">
            {getTransportIcon(transportType)}
          </span>
          <span className="text-xs font-bold uppercase text-base-content/80">
            {transportType}
          </span>
        </div>

        {isFeatured && (
          <div className="absolute top-0 right-0 bg-linear-to-l from-primary to-secondary text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl shadow-lg flex items-center gap-1 z-10">
            <FaStar className="text-[10px]" /> FEATURED
          </div>
        )}

        {!isPublic && (
          <div
            className={`absolute top-3 right-3 badge ${getStatusBadge()} font-bold uppercase border-none shadow-sm`}
          >
            {status}
          </div>
        )}

        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-white font-bold text-lg leading-tight truncate drop-shadow-md">
            {title}
          </h3>
        </div>
      </div>

      {/* --- Body Section  --- */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        {/* Route Visual */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-base-200/50 border border-base-200 gap-2">
          {/* From */}
          <div className="flex-1 min-w-0 text-left">
            <span className="block text-[10px] uppercase font-bold text-base-content/50">
              From
            </span>
            <span
              className="block font-bold text-base-content truncate text-sm"
              title={from}
            >
              {from}
            </span>
          </div>

          {/* Arrow */}
          <div className="shrink-0 flex items-center justify-center w-6 text-primary/50">
            <FaArrowRight className="text-xs" />
          </div>

          {/* To */}
          <div className="flex-1 min-w-0 text-right">
            <span className="block text-[10px] uppercase font-bold text-base-content/50">
              To
            </span>
            <span
              className="block font-bold text-base-content truncate text-sm"
              title={to}
            >
              {to}
            </span>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-base-content/70">
            <FaCalendarAlt className="text-primary shrink-0" />
            <span className="font-medium text-xs sm:text-sm truncate">
              {departureDate}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 text-base-content/70">
            <FaClock className="text-orange-500 shrink-0" />
            <span className="font-medium text-xs sm:text-sm truncate">
              {departureTime}
            </span>
          </div>
        </div>

        {/* Perks */}
        {perks && perks.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {perks.slice(0, 3).map((perk, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold px-2 py-1 rounded-md bg-base-200/80 text-base-content/60 border border-base-300 whitespace-nowrap"
              >
                {perk}
              </span>
            ))}
            {perks.length > 3 && (
              <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                +{perks.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="border-t border-dashed border-base-300 my-auto"></div>

        {/* Price & Seats */}
        <div className="flex items-center justify-between mt-1">
          <div>
            <p className="text-[10px] font-bold text-base-content/50 uppercase">
              Ticket Price
            </p>
            <p className="text-lg md:text-xl font-black text-primary">
              ৳{price}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-base-content/50 uppercase">
              Available
            </p>
            <p className="text-base md:text-lg font-bold text-base-content">
              {quantity} Seats
            </p>
          </div>
        </div>
      </div>

      {/* --- Button UI --- */}
      <div className="p-4 bg-base-200/40 border-t border-base-200">
        {isPublic ? (
          <Link
            to={`/ticket/${_id}`}
            className="btn btn-gradient w-full shadow-lg shadow-primary/20 text-white font-bold min-h-10 h-10"
          >
            View Details
          </Link>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <Link
              to={`/dashboard/edit-ticket/${_id}`}
              state={{ ticket }}
              className={`btn btn-sm h-10 font-bold border-none shadow-sm ${
                status === "rejected"
                  ? "btn-disabled bg-base-200 text-base-content/30"
                  : "bg-info/10 text-info hover:bg-info hover:text-white"
              }`}
            >
              <FaEdit /> Edit
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              disabled={status === "rejected"}
              className={`btn btn-sm h-10 font-bold border-none shadow-sm ${
                status === "rejected"
                  ? "btn-disabled bg-base-200 text-base-content/30"
                  : "bg-error/10 text-error hover:bg-error hover:text-white"
              }`}
            >
              <FaTrashAlt /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
