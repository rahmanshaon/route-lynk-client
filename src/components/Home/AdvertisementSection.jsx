import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TicketCard from "../Dashboard/Vendor/TicketCard";
import Loader from "../Shared/Loader";

const AdvertisementSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ["advertised-tickets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tickets/advertised");
      return res.data;
    },
  });

  if (isLoading) return <Loader small message="Loading top picks..." />;
  if (tickets.length === 0) return null;

  return (
    <section className="pb-20">
      <div className="container mx-auto px-4">
        {/* --- Section Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-3 animate-pulse">
            <FaStar /> Featured Journeys
          </div>

          <h2 className="text-4xl font-black text-base-content mb-4 leading-tight">
            Top Picks for <span className="text-gradient">You</span>
          </h2>

          <p className="text-base-content/60 leading-relaxed">
            Handpicked journeys with the best prices and amenities. Don't miss
            out on these exclusive offers!
          </p>
        </div>

        {/* --- Ticket Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              isPublic={true}
              isFeatured={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;
