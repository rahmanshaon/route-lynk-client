import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import TicketCard from "../../../components/Dashboard/Vendor/TicketCard";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router";

const MyAddedTickets = () => {
  useTitle("My Added Tickets");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch Tickets
  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-tickets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tickets/vendor/${user?.email}`);
      return res.data;
    },
  });

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tickets/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your ticket has been deleted.", "success");
            refetch(); // Refresh the list
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete ticket.", "error");
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-dots loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-gradient">My Tickets</h2>
          <p className="text-gray-500 mt-1">
            Manage your {tickets.length} tickets
          </p>
        </div>

        <Link
          to="/dashboard/add-ticket"
          className="btn btn-gradient btn-sm md:btn-md"
        >
          <FaPlusCircle /> Add New Ticket
        </Link>
      </div>

      {tickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="flex flex-col items-center justify-center h-[50vh] bg-base-100 rounded-2xl border border-dashed border-gray-300">
          <img
            src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png"
            alt="No tickets"
            className="w-24 h-24 opacity-50 mb-4"
          />
          <h3 className="text-xl font-bold text-gray-400">
            No Tickets Added Yet
          </h3>
          <p className="text-gray-400 mb-6">
            Start by creating your first journey.
          </p>
          <Link
            to="/dashboard/add-ticket"
            className="btn btn-outline btn-primary"
          >
            Create Ticket
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;
