import React from "react";
import { FaMapMarkerAlt, FaBullhorn } from "react-icons/fa";

const AdvertiseCardGrid = ({ tickets, onToggle }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {tickets.map((ticket) => (
        <div key={ticket._id} className={`card shadow-lg border overflow-hidden ${
            ticket.isAdvertised ? 'bg-base-100 border-success/40' : 'bg-base-100 border-base-200'
        }`}>
          
          <div className="card-body p-4">
            
            {/* Header */}
            <div className="flex gap-3 items-center">
               <img src={ticket.image} alt={ticket.title} className="w-14 h-14 rounded-lg object-cover bg-base-300 shadow-sm" />
               <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base-content line-clamp-1">{ticket.title}</h3>
                  <div className="text-xs text-base-content/60 flex items-center gap-1 mt-0.5">
                      <FaMapMarkerAlt className="text-primary text-[10px]" />
                      <span className="truncate">{ticket.from} → {ticket.to}</span>
                  </div>
               </div>
               <div className="text-right">
                   <p className="text-lg font-black text-primary">৳{ticket.price}</p>
               </div>
            </div>

            <div className="divider my-2"></div>

            {/* Action Row */}
            <div className="flex items-center justify-between">
                
                {/* Status Indicator */}
                <div className="flex items-center gap-2">
                    {ticket.isAdvertised ? (
                        <div className="flex items-center gap-1.5 text-success font-bold text-xs bg-success/10 px-2 py-1 rounded-md">
                            <FaBullhorn /> Advertised
                        </div>
                    ) : (
                         <div className="text-base-content/40 font-bold text-xs px-2 py-1">
                            Not Advertised
                        </div>
                    )}
                </div>

                {/* Toggle */}
                <div className="form-control">
                    <label className="label cursor-pointer gap-2 p-0">
                        <span className="label-text font-bold text-xs uppercase text-base-content/60">
                            {ticket.isAdvertised ? "On" : "Off"}
                        </span>
                        <input 
                            type="checkbox" 
                            className={`toggle toggle-sm ${ticket.isAdvertised ? 'toggle-success' : ''}`}
                            checked={ticket.isAdvertised || false}
                            onChange={() => onToggle(ticket._id, ticket.isAdvertised)}
                        />
                    </label>
                </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default AdvertiseCardGrid;