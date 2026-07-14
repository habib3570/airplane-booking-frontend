
import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { cn, getInitials, resolveImageUrl } from "../utils/helpers";
import {
  Plane,
  LayoutDashboard,
  User,
  Ticket,
  Menu,
  X,
  LogOut,
  Users,
  Building2,
  MapPin,
  BarChart3,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ROLES } from "../utils/constants";

const passengerNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Profile", icon: User, to: "/dashboard/profile" },
  { label: "My Bookings", icon: Ticket, to: "/dashboard/bookings" },
  { label: "My Tickets", icon: Ticket, to: "/dashboard/tickets" },
];

const adminNav = [
  { label: "Admin Home", icon: LayoutDashboard, to: "/admin" },
  { label: "Users", icon: Users, to: "/admin/users" },
  { label: "Airlines", icon: Building2, to: "/admin/airlines" },
  { label: "Airports", icon: MapPin, to: "/admin/airports" },
  { label: "Flights", icon: Plane, to: "/admin/flights" },
  { label: "Reports", icon: BarChart3, to: "/admin/reports" },
  { label: "My Bookings", icon: Ticket, to: "/dashboard/bookings" },
  { label: "My Tickets", icon: Ticket, to: "/dashboard/tickets" },
  { label: "Profile", icon: User, to: "/dashboard/profile" },
];

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = user?.role === ROLES.ADMIN ? adminNav : passengerNav;

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-soft flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-navy/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-navy flex flex-col transition-transform duration-200",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center gap-2 px-6 h-16 border-b border-white/10">
          <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
            <Plane className="text-navy" size={18} />
          </div>
          <span className="text-lg font-heading font-bold text-white">
            SkyBook
          </span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gold text-navy"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
          <button
            className="lg:hidden text-navy"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>

          <div className="ml-auto flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-navy">
                {user?.fullName}
              </p>
              <p className="text-xs text-muted">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-navy text-gold flex items-center justify-center font-semibold text-sm overflow-hidden">
              {user?.profilePictureUrl ? (
  <img
    src={resolveImageUrl(user.profilePictureUrl)}
    alt={user.fullName}
    className="w-full h-full object-cover"
  />
) : (
  getInitials(user?.fullName)
)}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}