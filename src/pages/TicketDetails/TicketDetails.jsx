import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaCheck,
  FaTicketAlt,
  FaArrowRight,
  FaChair,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import BookingModal from "../../components/TicketDetails/BookingModal";
import CountdownTimer from "../../components/Shared/CountdownTimer";
import Loader from "../../components/Shared/Loader";

const TicketDetails = () => {
  const { id } = useParams();
  useTitle("Journey Details");
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  // --- FETCH DATA ---
  const {
    data: ticket,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ticket", id],
    enabled: !loading && !!user,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/${id}`);
      return res.data;
    },
  });

  const handleBooking = async (quantity, totalPrice) => {
    if (!user) return navigate("/login");
    setProcessing(true);
    try {
      const bookingData = {
        ticketId: ticket._id,
        ticketTitle: ticket.title,
        vendorEmail: ticket.vendor.email,
        userEmail: user.email,
        userName: user.displayName,
        quantity: parseInt(quantity),
        totalPrice: parseFloat(totalPrice),
        departureDate: ticket.departureDate,
        departureTime: ticket.departureTime,
        from: ticket.from,
        to: ticket.to,
        image: ticket.image,
        transportType: ticket.transportType,
      };

      const res = await axiosSecure.post("/bookings", bookingData);
      if (res.data.insertedId) {
        toast.success("Booking request sent! Check My Bookings.");
        setIsModalOpen(false);

        navigate("/dashboard/my-bookings");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed.");
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading || loading)
    return <Loader fullScreen message="Loading Journey Details..." />;

  if (isError || !ticket)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 text-base-content/60">
        <FaExclamationTriangle className="text-5xl text-warning animate-bounce" />
        <h2 className="text-2xl font-bold">Ticket Unavailable</h2>
        <p className="text-sm">
          This ticket may have been removed or access is restricted.
        </p>
        <button
          onClick={() => navigate("/all-tickets")}
          className="btn btn-primary btn-sm"
        >
          Browse Tickets
        </button>
      </div>
    );

  const isSoldOut = ticket.quantity === 0;

  const getIcon = (type) => {
    const t = type?.toLowerCase() || "bus";
    if (t.includes("flight") || t.includes("plane")) return <FaPlane />;
    if (t.includes("train")) return <FaTrain />;
    if (t.includes("ship") || t.includes("launch")) return <FaShip />;
    return <FaBus />;
  };

  return (
    <div className="bg-base-200/50 min-h-screen pb-12">
      {/* Banner Image */}
      <div className="w-full h-48 md:h-80 overflow-hidden relative">
        <img
          src={ticket.image}
          alt={ticket.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Card */}
            <div className="bg-base-100 rounded-2xl shadow-xl p-6 border border-base-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-2 border border-primary/20">
                  {getIcon(ticket.transportType)} {ticket.transportType}
                </span>
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-base-content mb-2 leading-tight">
                {ticket.title}
              </h1>
              <div className="flex items-center gap-2 text-base-content/60 font-medium">
                <FaMapMarkerAlt className="text-primary" />
                <span>{ticket.from}</span>
                <FaArrowRight className="text-xs opacity-50" />
                <span>{ticket.to}</span>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-200 text-center">
                <p className="text-xs uppercase font-bold text-base-content/40 mb-1">
                  Date
                </p>
                <p className="font-bold flex items-center justify-center gap-2 text-base-content">
                  <FaCalendarAlt className="text-primary" />{" "}
                  {ticket.departureDate}
                </p>
              </div>
              <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-200 text-center">
                <p className="text-xs uppercase font-bold text-base-content/40 mb-1">
                  Time
                </p>
                <p className="font-bold flex items-center justify-center gap-2 text-base-content">
                  <FaClock className="text-orange-500" /> {ticket.departureTime}
                </p>
              </div>
              <div className="bg-base-100 p-4 rounded-xl shadow-sm border border-base-200 text-center col-span-2 md:col-span-1">
                <p className="text-xs uppercase font-bold text-base-content/40 mb-1">
                  Seats
                </p>
                <p className="font-bold flex items-center justify-center gap-2 text-base-content">
                  <FaChair className="text-primary" /> {ticket.quantity} Left
                </p>
              </div>
            </div>

            {/* Countdown */}
            <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-6 flex flex-col items-center justify-center">
              <p className="text-xs font-bold uppercase text-base-content/40 mb-4 tracking-widest">
                Departure In
              </p>
              <CountdownTimer
                date={ticket.departureDate}
                time={ticket.departureTime}
                size="lg"
              />
            </div>

            {/* Description */}
            <div className="bg-base-100 rounded-2xl shadow-sm border border-base-200 p-6">
              <h3 className="font-bold text-lg text-base-content mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-primary" /> Trip Details
              </h3>
              <p className="text-base-content/70 whitespace-pre-line leading-relaxed text-sm md:text-base">
                {ticket.description}
              </p>

              {ticket.perks?.length > 0 && (
                <div className="mt-6 pt-6 border-t border-base-200">
                  <h4 className="font-bold text-xs text-base-content/40 uppercase mb-3">
                    Perks
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ticket.perks.map((perk, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-base-200/50 text-base-content/70 border border-base-300 rounded-full text-xs font-bold flex items-center gap-2"
                      >
                        <FaCheck className="text-green-500 text-[10px]" />{" "}
                        {perk}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Sticky) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-base-100 rounded-2xl shadow-xl border border-primary/20 p-6 lg:sticky lg:top-24">
              <div className="text-center mb-6">
                <p className="text-xs text-base-content/40 font-bold uppercase">
                  Price Per Person
                </p>
                <h2 className="text-4xl font-black text-primary mt-1">
                  ৳{ticket.price}
                </h2>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                disabled={isSoldOut || processing}
                className="btn btn-primary w-full btn-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 text-white font-bold border-none"
              >
                {isSoldOut ? (
                  "Sold Out"
                ) : (
                  <>
                    <FaTicketAlt /> Book Now
                  </>
                )}
              </button>

              <div className="mt-6 pt-6 border-t border-dashed border-base-200 flex items-center justify-center gap-3">
                <img
                  src={
                    ticket.vendor?.image || "https://i.ibb.co/wZQG7SwS/user.png"
                  }
                  alt="Vendor"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-base-200"
                />
                <div className="text-left">
                  <h4 className="font-bold text-base-content text-xs leading-tight">
                    {ticket.vendor?.name}
                  </h4>
                  <p className="text-[10px] text-base-content/40 uppercase font-bold">
                    Operator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BookingModal
          ticket={ticket}
          user={user}
          closeModal={() => setIsModalOpen(false)}
          handleBooking={handleBooking}
          processing={processing}
        />
      )}
    </div>
  );
};

export default TicketDetails;
