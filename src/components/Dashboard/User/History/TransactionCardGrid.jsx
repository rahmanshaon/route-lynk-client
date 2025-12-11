import React from "react";
import { FaCalendarAlt, FaReceipt } from "react-icons/fa";

const TransactionCardGrid = ({ payments }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {payments.map((payment) => (
        <div key={payment._id} className="card bg-base-100 shadow-md border border-base-200 overflow-hidden">
          
          {/* Top Indicator */}
          <div className="h-1 w-full bg-primary/50"></div>
          
          <div className="card-body p-4">
            
            {/* Header: Title & Amount */}
            <div className="flex justify-between items-start">
               <div className="flex gap-3">
                   <img 
                        src={payment.image} 
                        alt="Ticket" 
                        className="w-12 h-12 rounded-lg object-cover bg-base-300"
                    />
                   <div>
                       <h3 className="font-bold text-base-content line-clamp-1">{payment.ticketTitle}</h3>
                       <p className="text-xs text-base-content/50">{payment.quantity} Seats</p>
                   </div>
               </div>
               <div className="text-right">
                   <div className="font-black text-primary text-xl">৳{payment.price}</div>
               </div>
            </div>

            <div className="divider my-2"></div>

            {/* Details Grid */}
            <div className="flex flex-col gap-2 text-sm">
                
                {/* Transaction ID */}
                <div className="flex justify-between items-center bg-base-200/50 p-2 rounded-lg">
                    <span className="text-[10px] uppercase font-bold text-base-content/40 flex items-center gap-1">
                        <FaReceipt /> TXN ID
                    </span>
                    <span className="font-mono text-xs text-base-content/70 truncate max-w-[150px]">
                        {payment.transactionId}
                    </span>
                </div>

                {/* Date */}
                <div className="flex justify-between items-center bg-base-200/50 p-2 rounded-lg">
                    <span className="text-[10px] uppercase font-bold text-base-content/40 flex items-center gap-1">
                        <FaCalendarAlt /> Date
                    </span>
                    <span className="text-xs font-medium text-base-content/70">
                        {new Date(payment.date).toLocaleString()}
                    </span>
                </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionCardGrid;