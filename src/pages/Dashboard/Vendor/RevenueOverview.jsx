import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaWallet, FaTicketAlt, FaUsers, FaClock } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../components/Shared/Loader";

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

  // --- Data Preparation ---
  const barData = [
    { name: "Added", value: stats.totalAdded || 0, color: "#a78bfa" }, // Purple
    { name: "Sold", value: stats.totalSold || 0, color: "#34d399" }, // Green
    { name: "Pending", value: stats.pendingRequests || 0, color: "#fbbf24" }, // Amber
  ];

  const pieData = [
    { name: "Sold", value: stats.totalSold || 0 },
    { name: "Pending", value: stats.pendingRequests || 0 },
  ];

  const PIE_COLORS = ["#10b981", "#f59e0b"];

  // --- Custom Tooltip ---
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-base-200 border border-base-300 p-3 rounded-xl shadow-xl backdrop-blur-md bg-opacity-95">
          <p className="font-bold text-base-content text-sm mb-1">{label}</p>
          <p
            className="text-sm font-semibold"
            style={{ color: payload[0].fill || payload[0].color }}
          >
            {`${payload[0].name}: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // --- Stat Card Component ---
  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className="bg-base-100 p-5 rounded-2xl shadow-lg border border-base-200 flex items-center gap-4 hover:border-primary/20 transition-all duration-300 group min-w-0">
      <div
        className={`p-3 md:p-4 rounded-xl ${colorClass} text-white text-xl md:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0`}
      >
        <Icon />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] md:text-xs font-bold text-base-content/50 uppercase tracking-wider truncate">
          {title}
        </p>
        <h3 className="text-xl md:text-3xl font-black text-base-content mt-0.5 truncate">
          {value}
        </h3>
      </div>
    </div>
  );

  if (isLoading) return <Loader message="Analyzing Revenue..." />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* --- Page Header --- */}
      <div className="mb-8 flex items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Revenue Overview
          </h2>
          <p className="text-base-content/60 font-medium text-sm md:text-base mt-1">
            Visual analytics of your business performance.
          </p>
        </div>
      </div>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`৳${stats.totalRevenue || 0}`}
          icon={FaWallet}
          colorClass="bg-gradient-to-tr from-green-500 to-emerald-600"
        />
        <StatCard
          title="Tickets Sold"
          value={stats.totalSold || 0}
          icon={FaUsers}
          colorClass="bg-gradient-to-tr from-blue-500 to-cyan-600"
        />
        <StatCard
          title="Total Added"
          value={stats.totalAdded || 0}
          icon={FaTicketAlt}
          colorClass="bg-gradient-to-tr from-purple-500 to-violet-600"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pendingRequests || 0}
          icon={FaClock}
          colorClass="bg-gradient-to-tr from-orange-400 to-amber-500"
        />
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart: Activity Overview */}
        <div className="bg-base-100 p-4 md:p-6 rounded-2xl shadow-xl border border-base-200 min-w-0">
          <div className="mb-6">
            <h3 className="font-bold text-lg text-base-content">
              Activity Breakdown
            </h3>
            <p className="text-xs text-base-content/50">
              Comparison of added, sold, and pending tickets.
            </p>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                {/* Full Grid (Vertical + Horizontal) */}
                <CartesianGrid
                  strokeDasharray="3 3"
                  opacity={0.15}
                  stroke="#888"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "gray", fontSize: 12, fontWeight: "bold" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "gray", fontSize: 12 }}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }} // Hover effect on column
                />

                <Bar
                  dataKey="value"
                  radius={[6, 6, 0, 0]}
                  barSize={50}
                  // Optional: Add background bar to make it look full
                  background={{
                    fill: "rgba(0,0,0,0.02)",
                    radius: [6, 6, 0, 0],
                  }}
                >
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Sales Status */}
        <div className="bg-base-100 p-4 md:p-6 rounded-2xl shadow-xl border border-base-200 min-w-0">
          <div className="mb-6">
            <h3 className="font-bold text-lg text-base-content">
              Sales Performance
            </h3>
            <p className="text-xs text-base-content/50">
              Ratio of confirmed sales vs pending requests.
            </p>
          </div>

          <div className="h-[300px] w-full flex justify-center items-center">
            {stats.totalSold === 0 && stats.pendingRequests === 0 ? (
              <div className="flex flex-col items-center justify-center text-base-content/40">
                <FaClock className="text-4xl mb-2 opacity-20" />
                <p className="text-sm">No transaction data yet.</p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    formatter={(value, entry) => (
                      <span className="text-base-content/70 font-bold ml-1 text-sm">
                        {value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueOverview;
