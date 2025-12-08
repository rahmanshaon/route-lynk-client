import React from "react";
import {
  FaCalendarAlt,
  FaChair,
  FaArrowRight,
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import CountdownTimer from "../../Shared/CountdownTimer";

const BookingCard = ({ booking }) => {
  // Status Colors
  const statusConfig = {
    pending: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      border: "border-orange-100",
      label: "Pending",
    },
    accepted: {
      bg: "bg-green-50",
      text: "text-green-600",
      border: "border-green-100",
      label: "Accepted",
    },
    rejected: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-100",
      label: "Rejected",
    },
    paid: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
      label: "Confirmed",
    },
  };

  const status = statusConfig[booking.status] || statusConfig.pending;

  // Fallbacks for missing data
  const from = booking.from || "Start";
  const to = booking.to || "End";
  const date = booking.departureDate || "Date N/A";
  const time = booking.departureTime || "12:00 AM";

  return (
    <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden group">
      {/* --- Header Image --- */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={booking.image}
          alt={booking.ticketTitle}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

        {/* Status Badge */}
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border shadow-sm ${status.bg} ${status.text} ${status.border}`}
        >
          {status.label}
        </div>

        {/* Title */}
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="font-bold text-lg leading-tight truncate drop-shadow-md">
            {booking.ticketTitle}
          </h3>
        </div>
      </div>

      {/* --- Body Content --- */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Route Info */}
        <div className="flex items-center justify-between bg-base-200/40 p-3 rounded-xl border border-base-200">
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] uppercase font-bold text-gray-400">
              From
            </span>
            <span
              className="font-bold text-gray-700 text-sm truncate max-w-[100px]"
              title={from}
            >
              {from}
            </span>
          </div>

          <div className="flex items-center justify-center px-2">
            <FaArrowRight className="text-gray-300 text-xs" />
          </div>

          <div className="flex flex-col items-end min-w-0">
            <span className="text-[10px] uppercase font-bold text-gray-400">
              To
            </span>
            <span
              className="font-bold text-gray-700 text-sm truncate max-w-[100px] text-right"
              title={to}
            >
              {to}
            </span>
          </div>
        </div>

        {/* Date, Time & Seats */}
        <div className="grid grid-cols-2 gap-3 text-xs text-gray-500">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary" />
              <span className="font-semibold">{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-orange-500" />
              <span className="font-semibold">{time}</span>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center">
            <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-lg text-primary font-bold">
              <FaChair /> {booking.quantity} Seats
            </div>
          </div>
        </div>

        {/* Countdown */}
        {booking.status !== "rejected" && booking.status !== "paid" && (
          <div className="flex justify-center pt-2 pb-1 border-t border-dashed border-gray-200">
            <CountdownTimer date={date} time={time} size="sm" />
          </div>
        )}

        {/* --- Footer Action --- */}
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-gray-400">
              Total Price
            </p>
            <p className="text-xl font-black text-gray-800">
              ৳{booking.totalPrice}
            </p>
          </div>

          {booking.status === "accepted" && (
            <button className="btn btn-sm btn-primary h-10 px-4 rounded-lg shadow-blue-200 shadow-md animate-pulse border-none">
              Pay Now
            </button>
          )}
          {booking.status === "paid" && (
            <button className="btn btn-sm btn-outline btn-success h-9 min-h-0 gap-2">
              <FaCheckCircle /> Paid
            </button>
          )}
          {booking.status === "pending" && (
            <div className="text-[10px] font-bold text-orange-500 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 flex items-center gap-1">
              <FaExclamationCircle /> Approval Pending
            </div>
          )}
          {booking.status === "rejected" && (
            <div className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full">
              Cancelled
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
