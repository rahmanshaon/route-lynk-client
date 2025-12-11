import React from "react";

const TransactionTable = ({ payments }) => {
  return (
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-base-200 shadow-xl bg-base-100">
      <table className="table w-full align-middle">
        {/* Table Header */}
        <thead className="bg-base-200/60 text-base-content uppercase text-xs font-bold tracking-wider backdrop-blur-sm">
          <tr>
            <th className="py-5 pl-6">#</th>
            <th>Transaction ID</th>
            <th>Ticket Details</th>
            <th>Date & Time</th>
            <th className="text-right pr-6">Amount</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-base-200">
          {payments.map((payment, index) => (
            <tr
              key={payment._id}
              className="hover:bg-base-200/40 transition-colors duration-200"
            >
              <th className="pl-6 text-base-content/50">{index + 1}</th>

              {/* Transaction ID */}
              <td className="font-mono text-xs text-base-content/70">
                <span className="bg-base-200 px-2 py-1 rounded text-[10px] tracking-wide">
                    {payment.transactionId}
                </span>
              </td>

              {/* Ticket Info */}
              <td>
                <div className="flex items-center gap-3">
                    <img 
                        src={payment.image} 
                        alt="Ticket" 
                        className="w-10 h-10 rounded-lg object-cover bg-base-300"
                    />
                    <div>
                        <div className="font-bold text-sm text-base-content">{payment.ticketTitle}</div>
                        <div className="text-xs text-base-content/50 font-medium">
                            {payment.quantity} Seats Booked
                        </div>
                    </div>
                </div>
              </td>

              {/* Date */}
              <td>
                <div className="text-sm font-medium text-base-content/80">
                    {new Date(payment.date).toLocaleDateString()}
                </div>
                <div className="text-[10px] text-base-content/50">
                    {new Date(payment.date).toLocaleTimeString()}
                </div>
              </td>

              {/* Amount */}
              <td className="text-right pr-6">
                 <span className="font-black text-primary text-lg">
                    ৳{payment.price}
                 </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;