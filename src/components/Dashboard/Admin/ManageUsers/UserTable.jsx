import React from "react";
import UserActionButtons from "./UserActionButtons";

const UserTable = ({ users, currentUser, onPromote, onFraud }) => {
  return (
    <div className="hidden md:block overflow-x-auto rounded-2xl border border-base-200 shadow-xl bg-base-100">
      <table className="table w-full align-middle">
        {/* Table Header */}
        <thead className="bg-base-200/60 text-base-content uppercase text-xs font-bold tracking-wider backdrop-blur-sm">
          <tr>
            <th className="py-5 pl-6">#</th>
            <th>User Identity</th>
            <th className="text-center">Status</th>
            <th className="text-center w-[250px]">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-base-200">
          {users.map((user, index) => (
            <tr key={user._id} className="hover:bg-base-200/40 transition-colors duration-200">
              <th className="pl-6 text-base-content/50">{index + 1}</th>
              
              {/* User Info Column */}
              <td>
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12 ring ring-primary ring-offset-base-100 ring-offset-2 bg-base-300">
                      <img src={user.image || "https://i.ibb.co/wZQG7SwS/user.png"} alt="User" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{user.name}</div>
                    <div className="text-sm text-base-content/60 font-mono">{user.email}</div>
                  </div>
                </div>
              </td>

              {/* Status Column */}
              <td className="text-center">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border
                  ${user.role === 'admin' ? 'bg-primary/10 text-primary border-primary/20' : 
                    user.role === 'vendor' ? 'bg-secondary/10 text-secondary border-secondary/20' : 
                    user.role === 'fraud' ? 'bg-error/10 text-error border-error/20' : 
                    'bg-base-300 text-base-content/70 border-base-300'}`}>
                  {user.role}
                </span>
              </td>

              {/* Actions Column */}
              <td>
                <UserActionButtons 
                  user={user} 
                  currentUser={currentUser} 
                  onPromote={onPromote} 
                  onFraud={onFraud} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;