import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { intervalToDuration, isPast, parse } from "date-fns";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaBus,
  FaTrain,
  FaShip,
  FaPlane,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import BookingModal from "../../components/TicketDetails/BookingModal";

const TicketDetails = () => {
  const { id } = useParams();
  useTitle("Ticket Details");
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  // Fetch Ticket
  const { data: ticket, isLoading } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tickets/${id}`);
      return res.data;
    },
  });

  // Countdown Logic (Updated for AM/PM & Seconds)
  useEffect(() => {
    if (!ticket) return;

    // Combine Date and Time
    const dateString = `${ticket.departureDate} ${ticket.departureTime}`;
    const departureDateTime = parse(
      dateString,
      "yyyy-MM-dd hh:mm a",
      new Date()
    );

    const updateTimer = () => {
      if (isPast(departureDateTime)) {
        setTimeLeft("Expired");
      } else {
        const duration = intervalToDuration({
          start: new Date(),
          end: departureDateTime,
        });
        setTimeLeft(duration);
      }
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000); // Update every 1 SECOND

    return () => clearInterval(timerId);
  }, [ticket]);

  const handleBooking = async (quantity, totalPrice) => {
    if (!user) {
      toast.error("Please login to book tickets");
      return navigate("/login");
    }

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
        image: ticket.image,
      };

      const res = await axiosSecure.post("/bookings", bookingData);
      if (res.data.insertedId) {
        toast.success("Booking request sent successfully!");
        setIsModalOpen(false);
        navigate("/dashboard/my-bookings");
      }
    } catch (error) {
      console.error(error);
      toast.error("Booking failed.");
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  const isExpired = timeLeft === "Expired";
  const isSoldOut = ticket.quantity === 0;
  const icons = {
    bus: <FaBus />,
    flight: <FaPlane />,
    train: <FaTrain />,
    launch: <FaShip />,
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Image & Countdown */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-64 lg:h-80">
            <img
              src={ticket.image}
              alt={ticket.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 badge badge-lg bg-white/90 text-primary font-bold shadow-md uppercase">
              {icons[ticket.transportType]}{" "}
              <span className="ml-2">{ticket.transportType}</span>
            </div>
          </div>

          {/* Countdown Card (With Seconds) */}
          <div
            className={`card shadow-lg border ${
              isExpired
                ? "bg-red-50 border-red-200"
                : "bg-primary/5 border-primary/20"
            }`}
          >
            <div className="card-body items-center text-center p-6">
              <h3 className="font-bold uppercase text-gray-500 text-xs tracking-widest">
                Time Remaining
              </h3>
              {isExpired ? (
                <span className="text-3xl font-black text-error flex items-center gap-2">
                  <FaExclamationTriangle /> DEPARTED
                </span>
              ) : (
                // Added 'seconds' to the array
                <div className="flex gap-4 mt-2 font-mono text-gray-700">
                  {["days", "hours", "minutes", "seconds"].map((unit) => (
                    <div key={unit} className="flex flex-col items-center">
                      <span className="countdown font-black text-3xl md:text-4xl">
                        <span
                          style={{ "--value": timeLeft?.[unit] || 0 }}
                        ></span>
                      </span>
                      <span className="text-[10px] md:text-xs uppercase opacity-60">
                        {unit}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">
              {ticket.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-gray-500">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" /> {ticket.from} →{" "}
                {ticket.to}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />{" "}
                {ticket.departureDate}
              </span>
              <span className="flex items-center gap-2">
                <FaClock className="text-primary" /> {ticket.departureTime}
              </span>
            </div>
          </div>

          <div className="prose max-w-none text-gray-600 bg-base-100 p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 text-lg mb-2">
              Journey Details
            </h3>
            <p className="whitespace-pre-line leading-relaxed">
              {ticket.description}
            </p>
          </div>

          {ticket.perks?.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 text-lg mb-4">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-3">
                {ticket.perks.map((perk, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-base-200 rounded-lg text-sm font-semibold flex items-center gap-2 text-gray-600"
                  >
                    <FaCheckCircle className="text-success text-xs" /> {perk}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 sticky bottom-4 z-30">
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase">
                Ticket Price
              </p>
              <p className="text-4xl font-black text-gradient">
                ৳{ticket.price}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              disabled={isExpired || isSoldOut || processing}
              className="btn btn-gradient btn-lg w-full sm:w-auto px-12 shadow-blue-300/50 shadow-lg"
            >
              {isSoldOut ? "Sold Out" : isExpired ? "Expired" : "Book Now"}
            </button>
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
