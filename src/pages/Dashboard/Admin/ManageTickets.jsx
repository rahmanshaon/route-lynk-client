import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTicketAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../components/Shared/Loader";
import TicketTable from "../../../components/Dashboard/Admin/ManageTickets/TicketTable";
import TicketCardGrid from "../../../components/Dashboard/Admin/ManageTickets/TicketCardGrid";

const ManageTickets = () => {
  useTitle("Manage Tickets");
  const axiosSecure = useAxiosSecure();

  // --- Data Fetching ---
  const {
    data: tickets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-tickets-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/admin");
      return res.data;
    },
  });

  // --- Handle Status Update ---
  const handleStatusUpdate = async (id, newStatus) => {
    // Show confirmation for rejection
    if (newStatus === "rejected") {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This ticket will be removed from the public listing.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Reject it!",
      });
      if (!result.isConfirmed) return;
    }

    try {
      const res = await axiosSecure.patch(`/tickets/status/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `Ticket ${newStatus === "approved" ? "Approved" : "Rejected"}`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (isLoading) return <Loader message="Loading Tickets..." />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* --- Page Header --- */}
      <div className="mb-8 flex items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Manage Tickets
          </h2>
          <p className="text-base-content/60 font-medium text-sm md:text-base mt-1">
            Total Tickets:{" "}
            <span className="text-primary font-bold">{tickets.length}</span>
          </p>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-300 text-center">
          <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-4">
            <FaTicketAlt className="text-4xl text-base-content/20" />
          </div>
          <h3 className="text-xl font-bold text-base-content/70">
            No Tickets Found
          </h3>
          <p className="text-sm text-base-content/50 mt-1">
            Vendors haven't added any tickets yet.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop View */}
          <TicketTable tickets={tickets} onStatusUpdate={handleStatusUpdate} />

          {/* Mobile View */}
          <TicketCardGrid
            tickets={tickets}
            onStatusUpdate={handleStatusUpdate}
          />
        </>
      )}
    </div>
  );
};

export default ManageTickets;
