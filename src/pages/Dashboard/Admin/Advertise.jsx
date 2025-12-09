import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";

const Advertise = () => {
  useTitle("Advertise Tickets");
  const axiosSecure = useAxiosSecure();

  // Fetch All Approved Tickets
  const { data: tickets = [], refetch } = useQuery({
    queryKey: ["advertise-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tickets/admin");

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
        return Swal.fire(
          "Limit Reached",
          "You can only advertise up to 6 tickets.",
          "warning"
        );
      }

      if (res.data.modifiedCount > 0) {
        const msg = !currentStatus ? "Added to" : "Removed from";
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: `Ticket ${msg} advertisements.`,
          timer: 1000,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gradient">Advertise Tickets</h2>
        <p className="text-gray-500">
          Highlight up to 6 top journeys on the home page.
        </p>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
        <table className="table">
          <thead className="bg-base-200 text-gray-600 uppercase text-xs">
            <tr>
              <th>Ticket</th>
              <th>Route</th>
              <th>Price</th>
              <th className="text-center">Advertise</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket._id} className="hover:bg-base-50">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-10 h-10">
                        <img src={ticket.image} alt={ticket.title} />
                      </div>
                    </div>
                    <div className="font-bold text-sm">{ticket.title}</div>
                  </div>
                </td>
                <td className="text-xs">
                  <span className="font-semibold">{ticket.from}</span> →{" "}
                  <span className="font-semibold">{ticket.to}</span>
                </td>
                <td className="font-bold text-xs">৳{ticket.price}</td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="toggle toggle-success toggle-sm"
                    checked={ticket.isAdvertised || false}
                    onChange={() =>
                      handleToggle(ticket._id, ticket.isAdvertised)
                    }
                  />
                </td>
              </tr>
            ))}
            {tickets.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-400">
                  No approved tickets available to advertise.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Advertise;
