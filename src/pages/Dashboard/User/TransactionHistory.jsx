import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";

const TransactionHistory = () => {
  useTitle("History");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div>
      <h2 className="text-3xl font-black text-gradient mb-8">Transaction History</h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
        <table className="table">
          <thead className="bg-base-200 text-gray-600 uppercase text-xs">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Ticket Info</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id} className="hover:bg-base-50">
                <th>{index + 1}</th>
                <td className="font-mono text-xs text-gray-500">{payment.transactionId}</td>
                <td>
                  <div className="font-bold">{payment.ticketTitle}</div>
                  <div className="text-xs text-gray-400">{payment.quantity} Seats</div>
                </td>
                <td className="font-black text-primary">৳{payment.price}</td>
                <td className="text-xs text-gray-500">
                   {new Date(payment.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {payments.length === 0 && (
            <div className="p-10 text-center text-gray-500">No transactions found.</div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;