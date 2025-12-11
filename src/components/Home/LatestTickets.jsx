import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaArrowRight, FaTicketAlt } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TicketCard from "../Dashboard/Vendor/TicketCard";
import Loader from "../Shared/Loader";

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
    return <Loader small message="Loading new schedules..." />;
  }

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4">
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-3 animate-pulse">
            <FaTicketAlt /> New Arrivals
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-base-content mb-4 leading-tight">
            Latest <span className="text-gradient">Journeys</span>
          </h2>
          <p className="text-base-content/60 text-lg leading-relaxed">
            Discover the most recently added schedules for buses, trains,
            launches, and flights. Secure your seat before it's gone!
          </p>
        </div>

        {/* --- Ticket Grid --- */}
        {tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
            {tickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} isPublic={true} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
            <div className="w-16 h-16 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTicketAlt className="text-3xl text-base-content/20" />
            </div>
            <h3 className="text-xl font-bold text-base-content/60">
              No tickets available yet
            </h3>
            <p className="text-base-content/40 text-sm mt-1">
              Check back later for new schedules.
            </p>
          </div>
        )}

        {/* --- View All Button --- */}
        {tickets.length > 0 && (
          <div className="text-center">
            <Link
              to="/all-tickets"
              className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white hover:border-primary btn-lg rounded-full px-8 gap-3 font-bold shadow-lg shadow-primary/10 transition-all hover:scale-105"
            >
              View All Tickets <FaArrowRight />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestTickets;
