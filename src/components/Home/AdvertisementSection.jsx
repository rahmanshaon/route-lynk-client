import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TicketCard from "../Dashboard/Vendor/TicketCard";
import { FaStar } from "react-icons/fa";

const AdvertisementSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: tickets = [] } = useQuery({
    queryKey: ["advertised-tickets"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tickets/advertised");
      return res.data;
    },
  });

  if (tickets.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest mb-4">
              <FaStar /> Featured Journeys
           </div>
           <h2 className="text-4xl font-black text-gray-800">
             Top Picks for <span className="text-gradient">You</span>
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} isPublic={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertisementSection;