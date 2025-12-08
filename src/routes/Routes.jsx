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
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-tickets",
        element: <AllTickets />,
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
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "",
        element: <Profile />,
      },
      {
        path: "add-ticket",
        element: <AddTicket />,
      },
      {
        path: "my-added-tickets",
        element: <MyAddedTickets />,
      },
      {
        path: "manage-tickets",
        element: <ManageTickets />,
      },
    ],
  },
]);

export default router;
