import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../components/Shared/Loader";
import TransactionTable from "../../../components/Dashboard/User/History/TransactionTable";
import TransactionCardGrid from "../../../components/Dashboard/User/History/TransactionCardGrid";
import { FaHistory, FaReceipt } from "react-icons/fa";

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

  if (isLoading) return <Loader message="Loading Transactions..." />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 flex items-center gap-3">
        <div>
          <h2 className="text-2xl md:text-4xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Transaction History
          </h2>
          <p className="text-base-content/60 font-medium text-sm md:text-base">
            Total Payments:{" "}
            <span className="text-primary font-bold">{payments.length}</span>
          </p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-300 text-center">
          <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-4">
            <FaReceipt className="text-4xl text-base-content/20" />
          </div>
          <h3 className="text-xl font-bold text-base-content/70">
            No Transactions Yet
          </h3>
          <p className="text-sm text-base-content/50 mt-1">
            Your payment history will appear here once you book a ticket.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop View */}
          <TransactionTable payments={payments} />

          {/* Mobile View */}
          <TransactionCardGrid payments={payments} />
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
