import React from "react";
import {
  FaCalendarAlt,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaTicketAlt,
} from "react-icons/fa";
import { Link } from "react-router";
import CountdownTimer from "../../Shared/CountdownTimer";

const BookingCard = ({ booking }) => {
  const getTransportConfig = () => {
    const typeSource = booking.transportType || booking.ticketTitle || "";
    const key = typeSource.toLowerCase().trim();
    if (key.includes("flight") || key.includes("plane") || key.includes("air"))
      return { icon: <FaPlane />, label: "Flight" };
    if (key.includes("train") || key.includes("rail"))
      return { icon: <FaTrain />, label: "Train" };
    if (key.includes("launch") || key.includes("ship") || key.includes("boat"))
      return { icon: <FaShip />, label: "Launch" };
    return { icon: <FaBus />, label: "Bus" };
  };

  const transport = getTransportConfig();

  const isExpired = () => {
    if (!booking.departureDate) return false;
    const departureStr = `${booking.departureDate} ${
      booking.departureTime || "00:00"
    }`;
    const departureTime = new Date(departureStr).getTime();
    const currentTime = new Date().getTime();
    if (isNaN(departureTime))
      return new Date(booking.departureDate) < new Date().setHours(0, 0, 0, 0);
    return departureTime < currentTime;
  };

  const expired = isExpired();
  const status = booking.status;

  const getStatusBadge = () => {
    if (status === "paid") return "badge-success text-white";
    if (status === "rejected") return "badge-error text-white";
    if (expired && status !== "paid") return "badge-neutral text-white";
    if (status === "accepted") return "badge-primary text-white";
    return "badge-warning text-white";
  };

  const getStatusText = () => {
    if (status === "paid") return "Confirmed";
    if (status === "rejected") return "Cancelled";
    if (expired) return "Expired";
    if (status === "pending") return "Pending";
    return status;
  };

  return (
    <div className="group flex flex-col w-full h-full bg-base-100 rounded-2xl border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header Image */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={booking.image}
          alt={booking.ticketTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

        <div className="absolute top-3 left-3">
          <div className="badge badge-sm md:badge-md bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold gap-2 shadow-sm">
            {transport.icon} {booking.transportType || transport.label}
          </div>
        </div>

        <div
          className={`absolute top-3 right-3 badge badge-sm md:badge-md ${getStatusBadge()} border-none font-bold uppercase shadow-sm`}
        >
          {getStatusText()}
        </div>

        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-white font-bold text-lg leading-tight truncate drop-shadow-md">
            {booking.ticketTitle}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 md:p-5 flex flex-col gap-4 flex-1">
        {/* Route Visual */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-base-200/50 border border-base-200 gap-2">
          {/* From */}
          <div className="flex-1 min-w-0 text-left">
            <span className="block text-[10px] uppercase font-bold text-base-content/50">
              From
            </span>
            <span
              className="block font-bold text-base-content text-sm truncate"
              title={booking.from}
            >
              {booking.from}
            </span>
          </div>

          {/* Arrow */}
          <div className="shrink-0 flex flex-col items-center justify-center w-6 text-primary/50">
            <FaArrowRight className="text-xs" />
          </div>

          {/* To */}
          <div className="flex-1 min-w-0 text-right">
            <span className="block text-[10px] uppercase font-bold text-base-content/50">
              To
            </span>
            <span
              className="block font-bold text-base-content text-sm truncate"
              title={booking.to}
            >
              {booking.to}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-base-content/70 min-w-0">
            <FaCalendarAlt className="text-primary shrink-0" />
            <span className="font-medium text-xs truncate">
              {booking.departureDate}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2 text-base-content/70 min-w-0">
            <FaClock className="text-orange-500 shrink-0" />
            <span className="font-medium text-xs truncate">
              {booking.departureTime}
            </span>
          </div>

          <div className="col-span-2 flex items-center justify-center font-bold text-base md:text-lg pt-2 border-t border-base-200/50">
            <FaTicketAlt className="mr-2 text-base-content/40 text-sm" />
            <span className="text-base-content">
              Booked Seats:{" "}
              <span className="text-primary">{booking.quantity}</span>
            </span>
          </div>
        </div>

        {/* Countdown */}
        <div className="py-1 flex justify-center items-center h-8">
          {!expired && status !== "paid" && status !== "rejected" ? (
            <div className="scale-90 origin-center">
              <CountdownTimer
                date={booking.departureDate}
                time={booking.departureTime}
                size="sm"
              />
            </div>
          ) : (
            <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">
              {status === "paid"
                ? "Enjoy your Trip"
                : status === "rejected"
                ? "Booking Closed"
                : "Departure Passed"}
            </span>
          )}
        </div>

        <div className="border-t border-dashed border-base-300 my-1"></div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <p className="text-[10px] font-bold text-base-content/50 uppercase">
              {status === "paid" ? "Paid Amount" : "Total Cost"}
            </p>
            <p className="text-lg md:text-xl font-black text-primary">
              ৳{booking.totalPrice}
            </p>
          </div>

          <div className="flex-1 flex justify-end">
            {status === "accepted" && !expired && (
              <Link
                to="/dashboard/payment"
                state={{ booking }}
                className="btn btn-sm btn-primary w-24 md:w-32 shadow-md animate-pulse text-white border-none"
              >
                Pay Now
              </Link>
            )}
            {status === "paid" && (
              <button className="btn btn-sm btn-outline btn-success w-24 md:w-32 cursor-default no-animation">
                <FaCheckCircle /> Paid
              </button>
            )}
            {status === "pending" && !expired && (
              <button className="btn btn-sm btn-ghost bg-warning/10 text-warning w-24 md:w-32 cursor-default border-warning/20">
                <FaExclamationCircle /> Waiting
              </button>
            )}
            {status === "rejected" && (
              <button className="btn btn-sm btn-ghost bg-error/10 text-error w-24 md:w-32 cursor-default border-error/20">
                <FaTimesCircle /> Cancelled
              </button>
            )}
            {expired && status !== "paid" && status !== "rejected" && (
              <button
                disabled
                className="btn btn-sm btn-disabled bg-base-200 text-base-content/40 w-24 md:w-32 border-none"
              >
                Departed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
