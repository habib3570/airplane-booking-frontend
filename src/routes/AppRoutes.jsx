import { Routes, Route } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import Profile from "../pages/dashboard/Profile";
import MyBookings from "../pages/dashboard/MyBookings";
import MyTickets from "../pages/dashboard/MyTickets";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES } from "../utils/constants";

import SearchResults from "../pages/search/SearchResults";
import BookingPassengers from "../pages/booking/BookingPassengers";
import BookingPayment from "../pages/booking/BookingPayment";
import BookingConfirmation from "../pages/booking/BookingConfirmation";
import VerifyTicket from "../pages/verify/VerifyTicket";

import AdminDashboard from "../pages/admin/AdminDashboard";
import UsersManagement from "../pages/admin/UsersManagement";
import AirlinesManagement from "../pages/admin/AirlinesManagement";
import AirportsManagement from "../pages/admin/AirportsManagement";
import FlightsManagement from "../pages/admin/FlightsManagement";
import Reports from "../pages/admin/Reports";

import About from "../pages/static/About";
import Contact from "../pages/static/Contact";
import Terms from "../pages/static/Terms";
import PrivacyPolicy from "../pages/static/PrivacyPolicy";
import RefundPolicy from "../pages/static/RefundPolicy";
import FAQPage from "../pages/static/FAQPage";

import AirlineDetails from "../pages/public/AirlineDetails";
import AirportDetails from "../pages/public/AirportDetails";

//admin setting
import SettingsPage from "../pages/admin/SettingsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/airlines/:id" element={<AirlineDetails />} />
        <Route path="/airports/:iataCode" element={<AirportDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/faq" element={<FAQPage />} />

        <Route
          path="/booking/passengers"
          element={
            <ProtectedRoute>
              <BookingPassengers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:id/payment"
          element={
            <ProtectedRoute>
              <BookingPayment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:id/confirmation"
          element={
            <ProtectedRoute>
              <BookingConfirmation />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/verify/:ticketNumber"
        element={
          <ProtectedRoute>
            <VerifyTicket />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="bookings" element={<MyBookings />} />
        <Route path="tickets" element={<MyTickets />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="airlines" element={<AirlinesManagement />} />
        <Route path="airports" element={<AirportsManagement />} />
        <Route path="flights" element={<FlightsManagement />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}