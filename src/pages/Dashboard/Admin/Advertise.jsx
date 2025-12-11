import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaAd } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../components/Shared/Loader";
import AdvertiseTable from "../../../components/Dashboard/Admin/Advertise/AdvertiseTable";
import AdvertiseCardGrid from "../../../components/Dashboard/Admin/Advertise/AdvertiseCardGrid";

const Advertise = () => {
  useTitle("Advertise Tickets");
  const axiosSecure = useAxiosSecure();

  // Fetch All Approved Tickets
  const {
    data: tickets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["advertise-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/admin");
      // Only show approved tickets
      return res.data.filter((t) => t.status === "approved");
    },
  });

  // Handle Toggle
  const handleToggle = async (id, currentStatus) => {
    try {
      const res = await axiosSecure.patch(`/tickets/advertise/${id}`, {
        isAdvertised: !currentStatus,
      });

      if (res.data.limitReached) {
        return Swal.fire({
          title: "Limit Reached",
          text: "You can only advertise up to 6 tickets at a time.",
          icon: "warning",
          confirmButtonColor: "#fbbd23",
        });
      }

      if (res.data.modifiedCount > 0) {
        const msg = !currentStatus ? "Added to" : "Removed from";

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: `Ticket successfully ${msg} advertisements.`,
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  // Stats Logic
  const advertisedCount = tickets.filter((t) => t.isAdvertised).length;
  const limit = 6;
  const progressPercent = (advertisedCount / limit) * 100;

  if (isLoading) return <Loader message="Loading Approved Tickets..." />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Advertise Tickets
            </h2>
            <p className="text-base-content/60 font-medium text-sm md:text-base mt-1">
              Highlight your best journeys on the home page.
            </p>
          </div>
        </div>

        {/* --- Slot Counter Badge --- */}
        <div className="bg-base-100 p-3 rounded-xl border border-base-200 shadow-sm min-w-[180px]">
          <div className="flex justify-between text-xs font-bold uppercase text-base-content/50 mb-2">
            <span>Active Slots</span>
            <span
              className={`${
                advertisedCount >= limit ? "text-error" : "text-primary"
              }`}
            >
              {advertisedCount} / {limit}
            </span>
          </div>
          <progress
            className={`progress w-full h-2 ${
              advertisedCount >= limit ? "progress-error" : "progress-primary"
            }`}
            value={progressPercent}
            max="100"
          ></progress>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-300 text-center">
          <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-4">
            <FaAd className="text-4xl text-base-content/20" />
          </div>
          <h3 className="text-xl font-bold text-base-content/70">
            No Approved Tickets
          </h3>
          <p className="text-sm text-base-content/50 mt-1">
            You need to approve tickets in "Manage Tickets" before advertising
            them.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop View */}
          <AdvertiseTable tickets={tickets} onToggle={handleToggle} />

          {/* Mobile View */}
          <AdvertiseCardGrid tickets={tickets} onToggle={handleToggle} />
        </>
      )}
    </div>
  );
};

export default Advertise;
