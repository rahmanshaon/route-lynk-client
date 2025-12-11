import React from "react";
import { FaCheck, FaTimes, FaCalendarAlt, FaChair } from "react-icons/fa";

const BookingRequestCardGrid = ({ requests, onAction }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {requests.map((req) => {
         const isCompleted = req.status !== "pending";
         return (
            <div key={req._id} className="card bg-base-100 shadow-lg border border-base-200 overflow-hidden">
            
            {/* Status Line */}
            <div className={`h-1.5 w-full ${
                req.status === 'accepted' ? 'bg-success' : 
                req.status === 'rejected' ? 'bg-error' : 
                'bg-warning'
            }`}></div>

            <div className="card-body p-4">
                
                {/* Header: Ticket Title & Price */}
                <div className="flex justify-between items-start gap-3">
                    <div className="flex gap-3">
                        <img src={req.image} alt="Ticket" className="w-12 h-12 rounded-lg object-cover bg-base-300" />
                        <div className="min-w-0">
                            <h3 className="font-bold text-base-content line-clamp-1">{req.ticketTitle}</h3>
                            <div className="flex items-center gap-1 text-xs text-base-content/50 mt-0.5">
                                <FaCalendarAlt className="text-[10px]" /> {req.departureDate}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="font-black text-primary text-lg">৳{req.totalPrice}</div>
                    </div>
                </div>

                <div className="divider my-2"></div>

                {/* User Info Grid */}
                <div className="bg-base-200/50 p-3 rounded-lg flex items-center justify-between">
                    <div className="min-w-0">
                        <p className="font-bold text-xs text-base-content truncate">
                            {req.userName}
                        </p>
                        <p className="text-[10px] text-base-content/50 truncate">
                            {req.userEmail}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs font-bold bg-base-100 px-2 py-1 rounded border border-base-200 shadow-sm shrink-0">
                         <FaChair className="text-primary" /> {req.quantity} Seats
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                    <button 
                        onClick={() => onAction(req._id, "accepted")}
                        disabled={isCompleted}
                        className={`btn btn-sm w-full font-bold shadow-sm ${
                            isCompleted 
                            ? "bg-base-200 text-base-content/20 border-base-200"
                            : "bg-success/10 text-success border-success/20 hover:bg-success hover:text-white"
                        }`}
                    >
                        <FaCheck /> Accept
                    </button>
                    
                    <button 
                        onClick={() => onAction(req._id, "rejected")}
                        disabled={isCompleted}
                        className={`btn btn-sm w-full font-bold shadow-sm ${
                            isCompleted 
                            ? "bg-base-200 text-base-content/20 border-base-200"
                            : "bg-error/10 text-error border-error/20 hover:bg-error hover:text-white"
                        }`}
                    >
                        <FaTimes /> Reject
                    </button>
                </div>
            </div>
            </div>
         );
      })}
    </div>
  );
};

export default BookingRequestCardGrid;