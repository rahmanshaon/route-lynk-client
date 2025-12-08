import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaWallet, FaTicketAlt, FaUsers, FaClock } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";

const RevenueOverview = () => {
  useTitle("Revenue");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["vendor-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor-stats/${user?.email}`);
      return res.data;
    },
  });

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-base-200 flex items-center gap-6">
      <div className={`p-4 rounded-xl ${color} text-white text-2xl shadow-md`}>
        <Icon />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-400 uppercase">{title}</p>
        <h3 className="text-3xl font-black text-gray-800">{value}</h3>
      </div>
    </div>
  );

  if (isLoading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div>
      <h2 className="text-3xl font-black text-gradient mb-8">Revenue Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Revenue" 
            value={`৳${stats.totalRevenue || 0}`} 
            icon={FaWallet} 
            color="bg-gradient-to-tr from-green-400 to-green-600" 
        />
        <StatCard 
            title="Tickets Sold" 
            value={stats.totalSold || 0} 
            icon={FaUsers} 
            color="bg-gradient-to-tr from-blue-400 to-blue-600" 
        />
        <StatCard 
            title="Total Added" 
            value={stats.totalAdded || 0} 
            icon={FaTicketAlt} 
            color="bg-gradient-to-tr from-purple-400 to-purple-600" 
        />
        <StatCard 
            title="Pending Req" 
            value={stats.pendingRequests || 0} 
            icon={FaClock} 
            color="bg-gradient-to-tr from-orange-400 to-orange-600" 
        />
      </div>
      
    </div>
  );
};

export default RevenueOverview;