import React from "react";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaClock,
  FaCreditCard,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import CountdownTimer from "../../Shared/CountdownTimer";

const BookingCard = ({ booking }) => {
  // Status Configuration
  const statusConfig = {
    pending: {
      badge: "badge-warning text-white",
      icon: <FaExclamationCircle />,
      label: "Approval Pending",
    },
    accepted: {
      badge: "badge-success text-white",
      icon: <FaCreditCard />,
      label: "Ready to Pay",
    },
    rejected: {
      badge: "badge-error text-white",
      icon: <FaTimesCircle />,
      label: "Cancelled",
    },
    paid: {
      badge: "badge-info text-white",
      icon: <FaCheckCircle />,
      label: "Confirmed",
    },
  };

  const status = statusConfig[booking.status] || statusConfig.pending;

  // Fallbacks
  const from = booking.from || "Start";
  const to = booking.to || "End";
  const date = booking.departureDate || "N/A";
  const time = booking.departureTime || "12:00 AM";

  return (
    <div className="group flex flex-col h-full bg-base-100 rounded-2xl border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* --- Image Header --- */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={booking.image}
          alt={booking.ticketTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>

        {/* Status Badge */}
        <div
          className={`absolute top-3 right-3 badge ${status.badge} border-none font-bold uppercase shadow-sm`}
        >
          {booking.status}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-white font-bold text-lg leading-tight truncate drop-shadow-md">
            {booking.ticketTitle}
          </h3>
        </div>
      </div>

      {/* --- Body Content --- */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Route Grid */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-base-200/50 border border-base-200">
          <div className="flex flex-col min-w-0 w-[40%]">
            <span className="text-[10px] uppercase font-bold text-base-content/50">
              From
            </span>
            <span
              className="font-bold text-base-content text-sm truncate"
              title={from}
            >
              {from}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center w-[20%] text-primary/50">
            <FaArrowRight className="text-xs" />
          </div>

          <div className="flex flex-col items-end min-w-0 w-[40%]">
            <span className="text-[10px] uppercase font-bold text-base-content/50">
              To
            </span>
            <span
              className="font-bold text-base-content text-sm truncate text-right"
              title={to}
            >
              {to}
            </span>
          </div>
        </div>

        {/* Info Grid (Date, Time, Seats) */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-base-content/70">
            <FaCalendarAlt className="text-primary" />
            <span className="font-medium text-xs">{date}</span>
          </div>
          <div className="flex items-center justify-end gap-2 text-base-content/70">
            <FaClock className="text-orange-500" />
            <span className="font-medium text-xs">{time}</span>
          </div>

          {/* Seats Row */}
          <div className="col-span-2 flex items-center justify-center font-bold text-xl pt-2 border-t border-base-200/50">
            <span className="text-base-content">
              Booked Seats:
              <span className="text-gradient"> {booking.quantity}</span>
            </span>
          </div>
        </div>

        {/* Countdown */}
        {booking.status !== "rejected" && booking.status !== "paid" && (
          <div className="flex justify-center scale-90 origin-center py-1">
            <CountdownTimer date={date} time={time} size="sm" />
          </div>
        )}

        {/* Separator */}
        <div className="border-t border-dashed border-base-300 my-1"></div>

        {/* --- Footer: Price & Action --- */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-base-content/50 uppercase">
              Total Paid
            </p>
            <p className="text-xl font-black text-gradient">
              ৳ {booking.totalPrice}
            </p>
          </div>

          {/* Dynamic Action Buttons */}
          {booking.status === "accepted" && (
            <Link
              to="/dashboard/payment"
              state={{ booking }}
              className="btn btn-sm btn-gradient h-10 min-h-0 px-4 rounded-lg shadow-md animate-pulse border-none text-white"
            >
              Pay Now
            </Link>
          )}

          {booking.status === "paid" && (
            <div className="badge badge-outline badge-success gap-2 p-3 font-bold">
              <FaCheckCircle /> Paid
            </div>
          )}

          {booking.status === "pending" && (
            <div className="badge badge-ghost gap-2 p-3 text-xs bg-base-200 text-base-content/70">
              <FaExclamationCircle className="text-warning" /> Waiting
            </div>
          )}

          {booking.status === "rejected" && (
            <div className="badge badge-ghost gap-2 p-3 text-xs bg-red-50 text-red-500">
              <FaTimesCircle /> Cancelled
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
