import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Shared/Profile";
import AddTicket from "../pages/Dashboard/Vendor/AddTicket";
import MyAddedTickets from "../pages/Dashboard/Vendor/MyAddedTickets";
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets";
import AllTickets from "../pages/AllTickets/AllTickets";
import TicketDetails from "../pages/TicketDetails/TicketDetails";
import MyBookings from "../pages/Dashboard/User/MyBookings";
import RequestedBookings from "../pages/Dashboard/Vendor/RequestedBookings";
import Payment from "../components/Dashboard/User/Payment";
import TransactionHistory from "../pages/Dashboard/User/TransactionHistory";
import RevenueOverview from "../pages/Dashboard/Vendor/RevenueOverview";
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute";
import Advertise from "../pages/Dashboard/Admin/Advertise";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import GuestRoute from "./GuestRoute";
import ForgetPassword from "../pages/Login/ForgetPassword";

const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "/forget-password",
        element: (
          <GuestRoute>
            <ForgetPassword />
          </GuestRoute>
        ),
      },
      {
        path: "/all-tickets",
        element: <AllTickets />,
      },
      {
        path: "/ticket/:id",
        element: (
          <PrivateRoute>
            <TicketDetails />
          </PrivateRoute>
        ),
      },
    ],
  },

  // Dashboard Routes
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <Profile /> },
      { path: "profile", element: <Profile /> },

      // --- USER ROUTES ---
      { path: "my-bookings", element: <MyBookings /> },
      { path: "payment", element: <Payment /> },
      { path: "history", element: <TransactionHistory /> },

      // --- VENDOR ROUTES (PROTECTED) ---
      {
        path: "add-ticket",
        element: (
          <VendorRoute>
            <AddTicket />
          </VendorRoute>
        ),
      },
      {
        path: "my-added-tickets",
        element: (
          <VendorRoute>
            <MyAddedTickets />
          </VendorRoute>
        ),
      },
      {
        path: "bookings",
        element: (
          <VendorRoute>
            <RequestedBookings />
          </VendorRoute>
        ),
      },
      {
        path: "revenue",
        element: (
          <VendorRoute>
            <RevenueOverview />
          </VendorRoute>
        ),
      },

      // --- ADMIN ROUTES (PROTECTED) ---
      {
        path: "manage-tickets",
        element: (
          <AdminRoute>
            <ManageTickets />
          </AdminRoute>
        ),
      },
      {
        path: "advertise",
        element: (
          <AdminRoute>
            <Advertise />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
