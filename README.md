# RouteLynk - Online Ticket Booking Platform

**RouteLynk** is a modern, full-stack **MERN** application designed to streamline the travel ticketing process. It connects Travelers, Transport Operators (Vendors), and Administrators in a seamless ecosystem for booking Bus, Train, Launch, and Flight tickets.

The platform features secure payments via **Stripe**, role-based dashboards, real-time revenue analytics, and automated **E-Ticket PDF generation**.

---

## Live Links

- **Live Site:** [https://routelynk.netlify.app/](https://routelynk.netlify.app/)

---

## Tech Stack

### Frontend

- **React 19:** Modern UI library for building interactive interfaces.
- **React Router:** Client-side routing and protected navigation.
- **Tailwind CSS v4 + DaisyUI:** Utility-first styling with elegant components.
- **TanStack React Query:** Efficient server-state management and caching.
- **Firebase Authentication:** Secure login with Google + Email/Password.
- **Stripe:** Payment integration for online ticket purchases.
- **Swiper.js:** Smooth, touch-friendly hero sliders.
- **Recharts:** Analytics and chart visualizations for Vendor/Admin.
- **Axios:** HTTP client for API communication.
- **React Hook Form:** Lightweight form validation.
- **React Toastify & SweetAlert2:** Notifications and alerts.
- **Date-fns:** Date formatting + countdown calculations.
- **JSPDF + Autotable:** Automatic PDF Ticket generation.

### Backend

- **Node.js:** Runtime environment for executing server-side JavaScript.
- **Express.js:** Web framework for building APIs and backend routes.
- **MongoDB:** NoSQL database for storing users, tickets, bookings, and payments.
- **JWT (JSON Web Tokens):** Secure authentication and protected routes.
- **Stripe:** Payment gateway integration for ticket purchases.
- **Cors:** Cross-origin resource sharing configuration.
- **Dotenv:** Environment variable management.
- **Vercel:** Serverless deployment platform for backend APIs.

---

## Key Features

### Public Features

- Fully responsive modern homepage with hero slider (Swiper)
- Displays 6 advertised tickets selected by admin
- Shows 6 latest added tickets
- Search tickets by From → To
- Filter tickets by Transport Type: Bus / Train / Launch / Flight
- Sort tickets by Price: Low → High / High → Low
- View detailed ticket info with real-time departure countdown
- Live seat availability tracking
- Vendor details on ticket page

---

### User Features

- Secure authentication via Firebase Email/Password and Google Login
- Real-time booking validation (no booking if seats = 0 or departure passed)
- Stripe-powered online payments
- Automatic PDF E-Ticket generation after successful payment
- User dashboard with all bookings (Pending / Accepted / Rejected / Paid)
- View transaction history
- Re-download tickets anytime
- Supports Dark/Light mode with saved preferences

---

### Vendor Features

- Dedicated vendor dashboard
- Add new tickets with ImgBB image upload
- Edit or delete existing tickets (delete restricted if ticket is rejected)
- View verification status: Pending / Approved / Rejected
- Manage booking requests (Accept / Reject)
- Revenue analytics with Bar & Pie charts
- Fraud protection (fraud-marked vendors cannot add tickets and all listings are hidden)

---

### Admin Features

- Full admin control panel
- Approve or reject vendor-submitted tickets
- Promote user roles (Make Admin / Make Vendor)
- Mark vendors as Fraud
- Manage homepage advertisements (up to 6 advertised tickets)
- Toggle advertise/unadvertise for approved tickets
- Manage all users and monitor platform-wide activity

---
