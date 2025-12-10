import React from "react";
import UserActionButtons from "./UserActionButtons";

const UserCardGrid = ({ users, currentUser, onPromote, onFraud }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
      {users.map((user) => (
        <div key={user._id} className="card bg-base-100 shadow-lg border border-base-200 overflow-hidden">
          
          {/* Top Border Indicator */}
          <div className={`h-1.5 w-full ${
            user.role === 'admin' ? 'bg-primary' : 
            user.role === 'vendor' ? 'bg-secondary' : 
            user.role === 'fraud' ? 'bg-error' : 
            'bg-green-500' 
          }`}></div>
          
          <div className="card-body p-5">
            {/* Header */}
            <div className="flex justify-between items-start gap-3">
              <div className="flex gap-3 items-center overflow-hidden">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring ring-offset-2 ring-offset-base-100 ring-primary/50">
                    <img src={user.image || "https://i.ibb.co/wZQG7SwS/user.png"} alt="User" />
                  </div>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-lg truncate">{user.name}</h3>
                  <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                </div>
              </div>
              
              {/* Badge */}
              <span className={`badge badge-sm font-bold uppercase border-none text-white shrink-0
                ${user.role === 'admin' ? 'bg-primary' : 
                  user.role === 'vendor' ? 'bg-secondary' : 
                  user.role === 'fraud' ? 'bg-error' : 
                  'bg-green-500'}`}>
                {user.role}
              </span>
            </div>

            <div className="divider my-2"></div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-center text-base-content/40 uppercase tracking-widest mb-1">
                Controls
              </span>
              <UserActionButtons 
                user={user} 
                currentUser={currentUser} 
                onPromote={onPromote} 
                onFraud={onFraud}
                isMobile={true} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCardGrid;