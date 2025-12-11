import React, { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaReceipt, FaCalendarAlt, FaFileDownload } from "react-icons/fa";

import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../components/Shared/Loader";

const TransactionHistory = () => {
  useTitle("History");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();

  // Ref to prevent double download in Strict Mode
  const downloadAttempted = useRef(false);

  // --- Fetch Data ---
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/user/${user?.email}`);
      return res.data;
    },
  });

  // --- PDF Generator ---
  const generateTicketPDF = (payment) => {
    const doc = new jsPDF();

    const brandColor = [0, 82, 212];

    // --- Header ---
    doc.setFillColor(...brandColor);
    doc.rect(0, 0, 210, 35, "F");

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("RouteLynk", 14, 23);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Electronic Ticket Receipt", 195, 23, null, null, "right");

    // --- Ticket Info Section ---
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(`Transaction ID:`, 14, 50);
    doc.setFont("helvetica", "bold");
    doc.text(payment.transactionId, 50, 50);

    doc.setFont("helvetica", "normal");
    doc.text(`Issue Date:`, 14, 58);
    doc.text(new Date(payment.date).toLocaleDateString(), 50, 58);

    // --- Main Details Table ---
    autoTable(doc, {
      startY: 70,
      head: [["Description", "Details"]],
      body: [
        ["Journey Route", payment.ticketTitle],
        ["Passenger Name", user?.displayName || "Valued Customer"],
        ["Passenger Email", payment.userEmail],
        ["Departure Date", new Date(payment.date).toLocaleDateString()], // Assuming departure date logic matches booking
        ["Seats Booked", payment.quantity],
        ["Total Amount", `BDT ${payment.price}`],
        ["Payment Status", "PAID"],
      ],
      theme: "grid",
      headStyles: {
        fillColor: brandColor,
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: {
        fontSize: 11,
        cellPadding: 6,
        lineColor: [230, 230, 230],
      },
      columnStyles: {
        0: { fontStyle: "bold", width: 60 },
      },
    });

    // --- Footer Message ---
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      "Please verify your details before departure. Have a safe journey!",
      105,
      doc.lastAutoTable.finalY + 20,
      null,
      null,
      "center"
    );

    // --- Branding Footer ---
    doc.setDrawColor(brandColor[0], brandColor[1], brandColor[2]);
    doc.setLineWidth(1);
    doc.line(14, pageHeight - 15, 196, pageHeight - 15);

    doc.setTextColor(...brandColor);
    doc.setFontSize(9);
    doc.text("RouteLynk - Your Travel Partner", 14, pageHeight - 10);

    doc.save(`Ticket_${payment.transactionId.slice(-6)}.pdf`);
  };

  // --- Auto Download Effect ---
  useEffect(() => {
    // Check if redirected from payment with a transaction ID
    if (
      location.state?.autoDownload &&
      location.state?.transactionId &&
      payments.length > 0 &&
      !downloadAttempted.current
    ) {
      const recentPayment = payments.find(
        (p) => p.transactionId === location.state.transactionId
      );

      if (recentPayment) {
        downloadAttempted.current = true; // Prevent double download
        generateTicketPDF(recentPayment);

        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location.state, payments, navigate]);

  if (isLoading) return <Loader message="Loading Transactions..." />;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* --- Page Header --- */}
      <div className="mb-8 flex items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-black bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Transaction History
          </h2>
          <p className="text-base-content/60 font-medium text-sm md:text-base mt-1">
            Total Payments:{" "}
            <span className="text-primary font-bold">{payments.length}</span>
          </p>
        </div>
      </div>

      {/* --- Empty State --- */}
      {payments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-base-100 rounded-3xl border border-dashed border-base-300 text-center">
          <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center mb-4">
            <FaReceipt className="text-4xl text-base-content/20" />
          </div>
          <h3 className="text-xl font-bold text-base-content/70">
            No Transactions Yet
          </h3>
          <p className="text-sm text-base-content/50 mt-1">
            Your payment history will appear here once you book a ticket.
          </p>
        </div>
      ) : (
        <>
          {/* ======================= */}
          {/*    DESKTOP VIEW (Table) */}
          {/* ======================= */}
          <div className="hidden md:block overflow-x-auto rounded-2xl border border-base-200 shadow-xl bg-base-100">
            <table className="table w-full align-middle">
              <thead className="bg-base-200/60 text-base-content uppercase text-xs font-bold tracking-wider backdrop-blur-sm">
                <tr>
                  <th className="py-5 pl-6">#</th>
                  <th>Transaction ID</th>
                  <th>Ticket Details</th>
                  <th>Date & Time</th>
                  <th className="text-right">Amount</th>
                  <th className="text-center pr-6">Ticket</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-200">
                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-base-200/40 transition-colors"
                  >
                    <th className="pl-6 text-base-content/50">{index + 1}</th>

                    <td className="font-mono text-xs text-base-content/70">
                      <span className="bg-base-200 px-2 py-1 rounded">
                        {payment.transactionId}
                      </span>
                    </td>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10 bg-base-300">
                            <img src={payment.image} alt="Ticket" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-base-content">
                            {payment.ticketTitle}
                          </div>
                          <div className="text-xs text-base-content/50">
                            {payment.quantity} Seats
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="text-sm font-medium text-base-content/80">
                        {new Date(payment.date).toLocaleDateString()}
                      </div>
                      <div className="text-[10px] text-base-content/50">
                        {new Date(payment.date).toLocaleTimeString()}
                      </div>
                    </td>

                    <td className="text-right">
                      <span className="font-black text-primary text-lg">
                        ৳{payment.price}
                      </span>
                    </td>

                    <td className="text-center pr-6">
                      <button
                        onClick={() => generateTicketPDF(payment)}
                        className="btn btn-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white shadow-sm font-bold gap-2"
                      >
                        <FaFileDownload /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ======================= */}
          {/*    MOBILE VIEW (Cards)  */}
          {/* ======================= */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="card bg-base-100 shadow-md border border-base-200 overflow-hidden"
              >
                <div className="h-1 w-full bg-primary/50"></div>
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex gap-3">
                      <img
                        src={payment.image}
                        alt="T"
                        className="w-12 h-12 rounded-lg object-cover bg-base-300"
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-base-content line-clamp-1">
                          {payment.ticketTitle}
                        </h3>
                        <p className="text-xs text-base-content/50">
                          {payment.quantity} Seats
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-primary text-xl">
                        ৳{payment.price}
                      </div>
                    </div>
                  </div>

                  <div className="divider my-2"></div>

                  {/* Details */}
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex justify-between items-center bg-base-200/50 p-2 rounded-lg">
                      <span className="text-[10px] uppercase font-bold text-base-content/40 flex items-center gap-1">
                        <FaReceipt /> ID
                      </span>
                      <span className="font-mono text-xs text-base-content/70 truncate max-w-[120px]">
                        {payment.transactionId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-base-200/50 p-2 rounded-lg">
                      <span className="text-[10px] uppercase font-bold text-base-content/40 flex items-center gap-1">
                        <FaCalendarAlt /> Date
                      </span>
                      <span className="text-xs font-medium text-base-content/70">
                        {new Date(payment.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Download Btn */}
                  <button
                    onClick={() => generateTicketPDF(payment)}
                    className="btn btn-sm btn-primary w-full mt-4 text-white font-bold shadow-md gap-2"
                  >
                    <FaFileDownload /> Download Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionHistory;
