import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaPlus, FaTicketAlt } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../components/Shared/Loader";
import TicketCard from "../../../components/Dashboard/Vendor/TicketCard";

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
      title: "Delete Ticket?",
      text: "This action cannot be undone. All associated data will be lost.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3d4451",
      confirmButtonText: "Yes, Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/tickets/${id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
                title: "Deleted!",
                text: "Ticket has been removed.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            });
            refetch();
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete ticket.", "error");
        }
      }
    });
  };

  if (isLoading) return <Loader message="Loading your tickets..." />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div className="flex items-center gap-4">
           <div>
              <h2 className="text-2xl md:text-4xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                 My Tickets
              </h2>
              <p className="text-base-content/60 font-medium text-sm md:text-base mt-1">
                 You have added <span className="text-primary font-bold">{tickets.length}</span> tickets so far.
              </p>
           </div>
        </div>

        <Link
          to="/dashboard/add-ticket"
          className="btn btn-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          <FaPlus /> Add New Ticket
        </Link>
      </div>

      {/* --- Content Grid --- */}
      {tickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              handleDelete={handleDelete}
              isPublic={false} // Vendor Mode
            />
          ))}
        </div>
      ) : (
        /* --- Empty State (Dark/Light Adaptive) --- */
        <div className="flex flex-col items-center justify-center py-24 bg-base-100 rounded-3xl border-2 border-dashed border-base-300 text-center group hover:border-primary/30 transition-all duration-500">
           <div className="w-24 h-24 bg-base-200/50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <FaTicketAlt className="text-5xl text-base-content/20 group-hover:text-primary/40 transition-colors" />
           </div>
           
           <h3 className="text-2xl font-bold text-base-content/70">No Tickets Added</h3>
           <p className="text-base-content/50 mt-2 max-w-xs mx-auto leading-relaxed">
              You haven't listed any journeys yet. Start growing your business today!
           </p>
           
           <Link
            to="/dashboard/add-ticket"
            className="btn btn-outline btn-primary mt-6 btn-wide font-bold"
          >
            Create Your First Ticket
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyAddedTickets;