import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useTitle from "../../hooks/useTitle";
import TicketCard from "../../components/Dashboard/Vendor/TicketCard";

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

  // Handle Search Input
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* --- Page Header --- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-gradient mb-2">
          Find Your Journey
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore approved schedules for buses, trains, launches, and flights.
          Book your seat today!
        </p>
      </div>

      {/* --- Filter & Search Bar --- */}
      <div className="bg-base-100 shadow-xl p-4 rounded-2xl border border-base-200 mb-8 sticky top-20 z-40 backdrop-blur-lg bg-opacity-90">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* 1. Search Inputs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-1">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="From (e.g. Dhaka)"
                className="input input-bordered w-full pl-10 focus:input-primary"
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
              />
            </div>
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="To (e.g. Chittagong)"
                className="input input-bordered w-full pl-10 focus:input-primary"
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
              />
            </div>
          </div>

          {/* 2. Filters & Sort */}
          <div className="flex gap-3 w-full lg:w-auto">
            <select
              className="select select-bordered w-full sm:w-auto focus:select-primary"
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

            <select
              className="select select-bordered w-full sm:w-auto focus:select-primary"
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

      {/* --- Loading State --- */}
      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* --- Ticket Grid --- */}
      {!isLoading && tickets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} isPublic={true} />
          ))}
        </div>
      )}

      {/* --- Empty State --- */}
      {!isLoading && tickets.length === 0 && (
        <div className="text-center py-20 bg-base-100 rounded-xl border border-dashed border-gray-300">
          <h3 className="text-2xl font-bold text-gray-400">No Tickets Found</h3>
          <p className="text-gray-400">Try adjusting your search criteria.</p>
          <button
            onClick={() => {
              setSearchFrom("");
              setSearchTo("");
              setFilterType("");
              setSortPrice("");
            }}
            className="btn btn-link text-primary mt-2"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* --- Pagination Controls --- */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <div className="join shadow-md bg-base-100">
            <button
              className="join-item btn hover:bg-primary hover:text-white transition-colors"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              « Prev
            </button>

            {/* Generate Page Numbers */}
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`join-item btn ${
                  currentPage === idx + 1
                    ? "btn-primary text-white"
                    : "hover:bg-primary hover:text-white"
                }`}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            <button
              className="join-item btn hover:bg-primary hover:text-white transition-colors"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTickets;
