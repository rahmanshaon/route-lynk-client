import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import BookingCard from "../../../components/Dashboard/User/BookingCard";

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

  if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div>
      <h2 className="text-3xl font-black text-gradient mb-8">My Bookings</h2>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] bg-base-100 border border-dashed border-gray-300 rounded-xl">
           <h3 className="text-xl font-bold text-gray-400">No Bookings Found</h3>
           <p className="text-gray-400">You haven't booked any tickets yet.</p>
        </div>
      )}
    </div>
  );
};

export default MyBookings;