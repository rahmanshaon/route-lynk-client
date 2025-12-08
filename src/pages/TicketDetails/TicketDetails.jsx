import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { 
  FaMapMarkerAlt, FaCalendarAlt, FaClock, FaBus, FaTrain, FaShip, 
  FaPlane, FaCheck, FaTicketAlt, FaArrowRight, FaChair, FaInfoCircle
} from "react-icons/fa";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import BookingModal from "../../components/TicketDetails/BookingModal";
import CountdownTimer from "../../components/Shared/CountdownTimer";

const TicketDetails = () => {
  const { id } = useParams();
  useTitle("Journey Details");
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const { data: ticket, isLoading } = useQuery({
    queryKey: ["ticket", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tickets/${id}`);
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
            image: ticket.image
        };

        const res = await axiosSecure.post("/bookings", bookingData);
        if (res.data.insertedId) {
            toast.success("Booking request sent! Check My Bookings.");
            setIsModalOpen(false);
            navigate("/dashboard/my-bookings");
        }
    } catch (error) {
        toast.error("Booking failed.");
    } finally {
        setProcessing(false);
    }
  };

  if (isLoading) return <div className="h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  const isSoldOut = ticket.quantity === 0;
  const icons = { bus: <FaBus />, flight: <FaPlane />, train: <FaTrain />, launch: <FaShip /> };

  return (
    <div className="bg-base-200/50 min-h-screen pb-12">
      
      {/* --- 1. Banner Image --- */}
      <div className="w-full h-48 md:h-80 overflow-hidden relative">
          <img src={ticket.image} alt={ticket.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* --- Left Column --- */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Title Card */}
                <div className="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-200">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center gap-2">
                            {icons[ticket.transportType]} {ticket.transportType}
                        </span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-black text-gray-800 mb-2 leading-tight">
                        {ticket.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                        <FaMapMarkerAlt className="text-primary" /> 
                        <span>{ticket.from}</span>
                        <FaArrowRight className="text-xs opacity-50" /> 
                        <span>{ticket.to}</span>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-base-200 text-center">
                         <p className="text-xs uppercase font-bold text-gray-400 mb-1">Date</p>
                         <p className="font-bold flex items-center justify-center gap-2 text-gray-800">
                             <FaCalendarAlt className="text-primary"/> {ticket.departureDate}
                         </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-base-200 text-center">
                         <p className="text-xs uppercase font-bold text-gray-400 mb-1">Time</p>
                         <p className="font-bold flex items-center justify-center gap-2 text-gray-800">
                             <FaClock className="text-orange-500"/> {ticket.departureTime}
                         </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-base-200 text-center col-span-2 md:col-span-1">
                         <p className="text-xs uppercase font-bold text-gray-400 mb-1">Seats</p>
                         <p className="font-bold flex items-center justify-center gap-2 text-gray-800">
                             <FaChair className="text-primary"/> {ticket.quantity} Left
                         </p>
                    </div>
                </div>

                {/* Countdown */}
                <div className="bg-white rounded-2xl shadow-sm border border-base-200 p-6 flex flex-col items-center justify-center">
                    <p className="text-xs font-bold uppercase text-gray-400 mb-4 tracking-widest">Departure In</p>
                    <CountdownTimer date={ticket.departureDate} time={ticket.departureTime} size="lg" />
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl shadow-sm border border-base-200 p-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                        <FaInfoCircle className="text-primary"/> Trip Details
                    </h3>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed text-sm md:text-base">
                        {ticket.description}
                    </p>
                    
                    {ticket.perks?.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <h4 className="font-bold text-xs text-gray-400 uppercase mb-3">Amenities</h4>
                            <div className="flex flex-wrap gap-2">
                                {ticket.perks.map((perk, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-100 rounded-full text-xs font-bold flex items-center gap-2">
                                        <FaCheck className="text-green-500 text-[10px]" /> {perk}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- Right Column (Sticky) --- */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-2xl shadow-xl border border-primary/20 p-6 lg:sticky lg:top-24">
                    <div className="text-center mb-6">
                        <p className="text-xs text-gray-400 font-bold uppercase">Price Per Person</p>
                        <h2 className="text-4xl font-black text-primary mt-1">৳{ticket.price}</h2>
                    </div>

                    <button 
                        onClick={() => setIsModalOpen(true)}
                        disabled={isSoldOut || processing}
                        className="btn btn-gradient w-full btn-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 text-white font-bold"
                    >
                        {isSoldOut ? "Sold Out" : <><FaTicketAlt /> Book Now</>}
                    </button>
                    
                    <div className="mt-6 pt-6 border-t border-dashed border-gray-200 flex items-center justify-center gap-3">
                        <img 
                            src={ticket.vendor?.image || "https://i.ibb.co/wZQG7SwS/user.png"} 
                            alt="Vendor" 
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100"
                        />
                        <div className="text-left">
                            <h4 className="font-bold text-gray-800 text-xs leading-tight">{ticket.vendor?.name}</h4>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Operator</p>
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