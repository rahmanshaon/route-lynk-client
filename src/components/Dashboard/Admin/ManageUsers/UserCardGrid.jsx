import React from "react";
import UserActionButtons from "./UserActionButtons";

const UserCardGrid = ({ users, currentUser, onPromote, onFraud }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:hidden">
      {users.map((user) => (
        <div key={user._id} className="card bg-base-100 shadow-lg border border-base-200 overflow-hidden">
          
          {/* Top Border Color Indicator based on Role */}
          <div className={`h-1 w-full ${
            user.role === 'admin' ? 'bg-primary' : 
            user.role === 'vendor' ? 'bg-secondary' : 
            'bg-base-300'
          }`}></div>
          
          <div className="card-body p-5">
            {/* Header: Avatar + Name + Role Badge */}
            <div className="flex justify-between items-start gap-3">
              <div className="flex gap-3 items-center">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring ring-offset-2 ring-offset-base-100 ring-primary/50">
                    <img src={user.image || "https://i.ibb.co/wZQG7SwS/user.png"} alt="User" />
                  </div>
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-lg truncate">{user.name}</h3>
                  <p className="text-xs text-base-content/60 break-all">{user.email}</p>
                </div>
              </div>
              
              <span className={`badge badge-sm font-bold uppercase border-none text-white
                ${user.role === 'admin' ? 'bg-primary' : 
                  user.role === 'vendor' ? 'bg-secondary' : 
                  user.role === 'fraud' ? 'bg-error' : 'bg-neutral'}`}>
                {user.role}
              </span>
            </div>

            <div className="divider my-2"></div>

            {/* Actions Section */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">Controls</span>
              <UserActionButtons 
                user={user} 
                currentUser={currentUser} 
                onPromote={onPromote} 
                onFraud={onFraud} 
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCardGrid;