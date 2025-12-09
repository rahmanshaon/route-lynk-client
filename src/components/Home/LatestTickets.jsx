import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaArrowRight, FaTicketAlt } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TicketCard from "../Dashboard/Vendor/TicketCard";

const LatestTickets = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch Latest 6 Tickets
  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["latest-tickets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tickets/latest");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-base-200/30">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="text-center md:text-left w-full md:w-auto">
             <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-2">
                <FaTicketAlt /> New Schedules
             </div>
             <h2 className="text-3xl md:text-4xl font-black text-gray-800">
               Latest <span className="text-gradient">Journeys</span>
             </h2>
             <p className="text-gray-500 mt-2 max-w-md">
               Check out the most recently added bus, train, launch, and flight schedules.
             </p>
          </div>
          
          <Link 
            to="/all-tickets" 
            className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6 gap-2 transition-all w-full md:w-auto"
          >
             View All Tickets <FaArrowRight />
          </Link>
        </div>

        {/* Ticket Grid */}
        {tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tickets.map((ticket) => (
              <TicketCard 
                key={ticket._id} 
                ticket={ticket} 
                isPublic={true}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-base-200">
             <img 
               src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" 
               alt="Empty" 
               className="w-16 h-16 mx-auto opacity-40 mb-4"
             />
             <h3 className="text-xl font-bold text-gray-400">No tickets available yet</h3>
             <p className="text-gray-400 text-sm">Check back later for new schedules.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTickets;