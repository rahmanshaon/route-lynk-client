import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTicketAlt, FaBus, FaRegCalendarTimes } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import BookingCard from "../../../components/Dashboard/User/BookingCard";
import Loader from "../../../components/Shared/Loader";

const MyBookings = () => {
  useTitle("My Bookings");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/user/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader message="Loading Your Bookings..." />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* --- Page Header --- */}
      <div className="mb-8 flex items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Bookings
          </h2>
          <p className="text-base-content/60 font-medium text-sm md:text-base mt-1">
            Total Trips:{" "}
            <span className="text-primary font-bold">{bookings.length}</span>
          </p>
        </div>
      </div>

      {/* --- Content Area --- */}
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      ) : (
        /* --- Empty State --- */
        <div className="flex flex-col items-center justify-center py-20 bg-base-100 border-2 border-dashed border-base-300 rounded-3xl text-center group hover:border-primary/30 transition-all duration-500">
          <div className="w-24 h-24 bg-base-200/50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <FaRegCalendarTimes className="text-5xl text-base-content/20 group-hover:text-primary/40 transition-colors" />
          </div>

          <h3 className="text-2xl font-bold text-base-content/70">
            No Bookings Found
          </h3>
          <p className="text-base-content/50 mt-2 max-w-xs mx-auto leading-relaxed">
            You haven't booked any tickets yet. <br /> Your upcoming journeys
            will appear here.
          </p>

          <Link
            to="/all-tickets"
            className="btn btn-primary mt-6 btn-wide text-white font-bold shadow-lg shadow-primary/30"
          >
            <FaBus /> Explore Tickets
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
