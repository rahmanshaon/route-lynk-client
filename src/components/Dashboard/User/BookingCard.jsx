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
  const getTransportIcon = (type) => {
    const key = type?.toLowerCase().trim();

    if (key === "flight" || key === "plane") return <FaPlane />;
    if (key === "train" || key === "rail") return <FaTrain />;
    if (key === "launch" || key === "ship") return <FaShip />;

    return <FaBus />;
  };

  const transportIcon = getTransportIcon(booking.transportType);
  const transportLabel = booking.transportType || "Bus";

  // EXPIRATION LOGIC
  const isExpired = () => {
    if (!booking.departureDate) return false;

    const departureStr = `${booking.departureDate} ${
      booking.departureTime || "00:00"
    }`;
    const departureTime = new Date(departureStr).getTime();
    const currentTime = new Date().getTime();

    if (isNaN(departureTime)) {
      return new Date(booking.departureDate) < new Date().setHours(0, 0, 0, 0);
    }
    return departureTime < currentTime;
  };

  const expired = isExpired();
  const status = booking.status;

  // DYNAMIC STYLES

  // Status Badge Colors (Top Right)
  const getStatusBadgeClass = () => {
    switch (status) {
      case "paid":
        return "badge-info text-white";
      case "accepted":
        return "badge-success text-white";
      case "rejected":
        return "badge-error text-white";
      default:
        return "badge-warning text-white";
    }
  };

  return (
    <div className="group flex flex-col w-full h-full bg-base-100 rounded-2xl border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* --- Image Header --- */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={booking.image}
          alt={booking.ticketTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Transport Type (Top Left) */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-base-100/90 backdrop-blur text-base-content text-xs font-bold uppercase flex items-center gap-2 shadow-sm">
          <span className="text-primary text-sm">{transportIcon}</span>
          {transportLabel}
        </div>

        {/* Status Badge (Top Right) */}
        <div
          className={`absolute top-3 right-3 badge ${getStatusBadgeClass()} border-none font-bold uppercase shadow-sm`}
        >
          {status}
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-white font-bold text-lg leading-tight truncate drop-shadow-md">
            {booking.ticketTitle}
          </h3>
        </div>
      </div>

      {/* --- Body Content --- */}
      <div className="p-4 md:p-5 flex flex-col gap-4 flex-1">
        {/* Route Visualizer */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-base-200/50 border border-base-200">
          <div className="flex flex-col min-w-0 w-[40%]">
            <span className="text-[10px] uppercase font-bold text-base-content/50">
              From
            </span>
            <span
              className="font-bold text-base-content text-sm truncate"
              title={booking.from}
            >
              {booking.from}
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
              title={booking.to}
            >
              {booking.to}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-base-content/70">
            <FaCalendarAlt className="text-primary" />
            <span className="font-medium text-xs">{booking.departureDate}</span>
          </div>
          <div className="flex items-center justify-end gap-2 text-base-content/70">
            <FaClock className="text-orange-500" />
            <span className="font-medium text-xs">{booking.departureTime}</span>
          </div>

          {/* Quantity Row */}
          <div className="col-span-2 flex items-center justify-center font-bold text-base pt-2 border-t border-base-200/50">
            <FaTicketAlt className="mr-2 text-base-content/40 text-sm" />
            <span className="text-base-content">
              Booked Seats:{" "}
              <span className="text-primary">{booking.quantity}</span>
            </span>
          </div>
        </div>

        {/* Countdown Logic */}
        <div className="py-1 flex justify-center items-center h-8">
          {/* Show Timer ONLY if: Not Paid, Not Rejected, AND Not Expired */}
          {!expired && status !== "paid" && status !== "rejected" ? (
            <div className="scale-90 origin-center">
              <CountdownTimer
                date={booking.departureDate}
                time={booking.departureTime}
                size="sm"
              />
            </div>
          ) : (
            // Else show a status text
            <span className="text-xs font-bold text-base-content/40 uppercase tracking-widest">
              {status === "paid"
                ? "Enjoy your Trip"
                : status === "rejected"
                ? "Booking Closed"
                : "Departure Passed"}
            </span>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-dashed border-base-300 my-1"></div>

        {/* --- Footer --- */}
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
            {/* PAY NOW (Only if Accepted & Not Expired) */}
            {status === "accepted" && !expired && (
              <Link
                to="/dashboard/payment"
                state={{ booking }}
                className="btn btn-sm btn-primary w-28 md:w-32 shadow-md text-white border-none"
              >
                Pay Now
              </Link>
            )}

            {/* PAID */}
            {status === "paid" && (
              <button className="btn btn-sm btn-outline btn-success w-28 md:w-32 cursor-default no-animation">
                <FaCheckCircle /> Paid
              </button>
            )}

            {/* WAITING (Pending & Not Expired) */}
            {status === "pending" && !expired && (
              <button className="btn btn-sm btn-ghost bg-warning/10 text-warning w-28 md:w-32 cursor-default border-warning/20">
                <FaExclamationCircle /> Waiting
              </button>
            )}

            {/* REJECTED */}
            {status === "rejected" && (
              <button className="btn btn-sm btn-ghost bg-error/10 text-error w-28 md:w-32 cursor-default border-error/20">
                <FaTimesCircle /> Cancelled
              </button>
            )}

            {/* DEPARTED / EXPIRED (If date passed, blocking Payment or Waiting) */}
            {expired && status !== "paid" && status !== "rejected" && (
              <button
                disabled
                className="btn btn-sm btn-disabled bg-base-200 text-base-content/40 w-28 md:w-32 border-none"
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
