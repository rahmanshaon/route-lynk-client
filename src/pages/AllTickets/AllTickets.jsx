import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaMapMarkedAlt } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useTitle from "../../hooks/useTitle";
import TicketCard from "../../components/Dashboard/Vendor/TicketCard";
import Loader from "../../components/Shared/Loader";

const AllTickets = () => {
  useTitle("All Tickets");
  const axiosPublic = useAxiosPublic();

  // --- States for Filtering & Pagination ---
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // --- Fetch Tickets Query ---
  const { data, isLoading } = useQuery({
    queryKey: [
      "public-tickets",
      searchFrom,
      searchTo,
      filterType,
      sortPrice,
      currentPage,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit: itemsPerPage,
        from: searchFrom,
        to: searchTo,
        type: filterType,
        sort: sortPrice,
      });
      const res = await axiosPublic.get(`/tickets?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const tickets = data?.tickets || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="container mx-auto pb-20 px-4 min-h-screen">
      {/* --- Page Header --- */}
      <div className="text-center max-w-3xl mx-auto py-12 md:py-16">
        <div className="flex items-center justify-center gap-2 text-primary font-bold uppercase text-xs tracking-widest mb-3 animate-pulse">
          <FaMapMarkedAlt /> Explore All Routes
        </div>

        <h1 className="text-4xl font-black text-base-content mb-4 leading-tight">
          Find Your <span className="text-gradient">Journey</span>
        </h1>

        <p className="text-base-content/60 leading-relaxed max-w-2xl mx-auto">
          Search approved schedules for buses, trains, launches, and flights.
          Secure your seat today!
        </p>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="bg-base-100 p-4 rounded-xl border border-base-300 shadow-sm mb-10">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Inputs */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <input
              type="text"
              placeholder="From (e.g. Dhaka)"
              className="input input-bordered w-full focus:input-primary"
              value={searchFrom}
              onChange={(e) => setSearchFrom(e.target.value)}
            />
            <input
              type="text"
              placeholder="To (e.g. Chittagong)"
              className="input input-bordered w-full focus:input-primary"
              value={searchTo}
              onChange={(e) => setSearchTo(e.target.value)}
            />
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <select
                className="select select-bordered w-full sm:w-40 focus:select-primary"
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">All Transport</option>
                <option value="bus">Bus</option>
                <option value="train">Train</option>
                <option value="launch">Launch</option>
                <option value="flight">Flight</option>
              </select>
            </div>

            <div className="relative">
              <select
                className="select select-bordered w-full sm:w-40 focus:select-primary"
                value={sortPrice}
                onChange={(e) => {
                  setSortPrice(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Sort by Price</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* --- Loading State --- */}
      {isLoading && <Loader message="Finding tickets..." />}

      {/* --- Ticket Grid --- */}
      {!isLoading && tickets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} isPublic={true} />
          ))}
        </div>
      )}

      {/* --- Empty State --- */}
      {!isLoading && tickets.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-base-300 rounded-xl">
          <FaSearch className="text-4xl text-base-content/20 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-base-content/60">
            No Tickets Found
          </h3>
          <p className="text-base-content/50">
            Try changing your search filters.
          </p>
          <button
            onClick={() => {
              setSearchFrom("");
              setSearchTo("");
              setFilterType("");
              setSortPrice("");
            }}
            className="btn btn-primary btn-sm mt-4 text-white"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* --- Pagination --- */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="join border border-base-300">
            <button
              className="join-item btn btn-sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`join-item btn btn-sm ${
                  currentPage === idx + 1
                    ? "btn-active btn-primary text-white"
                    : ""
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            <button
              className="join-item btn btn-sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTickets;
