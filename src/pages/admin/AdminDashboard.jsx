import { useState, useEffect } from "react";
import {
  Plane,
  Users,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import Card from "../../components/ui/Card";
import Spinner from "../../components/ui/Spinner";
import StatCard from "../../components/admin/StatCard";
import { getDashboardStats } from "../../api/adminApi";
import { formatCurrency, formatDate, getErrorMessage } from "../../utils/helpers";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    setLoading(true);
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner size={32} className="text-navy" />
      </div>
    );
  }

  if (!stats) {
    return <p className="text-muted text-sm">Could not load dashboard stats.</p>;
  }

  const maxRevenue = Math.max(
    ...(stats.revenueByLastSevenDays?.map((d) => d.revenue) || [1])
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">Admin Dashboard</h1>
      <p className="text-muted mb-6">Overview of system performance</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Bookings" value={stats.totalBookings} icon={Calendar} accent="navy" />
        <StatCard label="Confirmed" value={stats.confirmedBookings} icon={CheckCircle} accent="green" />
        <StatCard label="Pending" value={stats.pendingBookings} icon={Clock} accent="gold" />
        <StatCard label="Cancelled" value={stats.cancelledBookings} icon={XCircle} accent="red" />
        <StatCard
          label="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          accent="gold"
        />
        <StatCard
          label="Revenue Today"
          value={formatCurrency(stats.revenueToday)}
          icon={DollarSign}
          accent="navy"
        />
        <StatCard label="Total Users" value={stats.totalUsers} icon={Users} accent="navy" />
        <StatCard label="Active Flights" value={stats.activeFlights} icon={Plane} accent="green" />
      </div>

      {(stats.delayedFlights > 0 || stats.cancelledFlights > 0) && (
        <Card className="mb-6 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-yellow-600 flex-shrink-0" size={20} />
            <p className="text-sm text-navy">
              <span className="font-semibold">{stats.delayedFlights}</span>{" "}
              flight(s) delayed and{" "}
              <span className="font-semibold">{stats.cancelledFlights}</span>{" "}
              flight(s) cancelled today.
            </p>
          </div>
        </Card>
      )}

      <Card>
        <h3 className="text-sm font-semibold text-navy mb-4">
          Revenue — Last 7 Days
        </h3>
        <div className="flex items-end gap-3 h-48">
          {stats.revenueByLastSevenDays?.map((day) => (
            <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-[10px] text-muted">
                {formatCurrency(day.revenue)}
              </span>
              <div
                className="w-full bg-navy rounded-t-md hover:bg-gold transition-colors"
                style={{
                  height: `${Math.max((day.revenue / maxRevenue) * 130, 4)}px`,
                }}
              />
              <span className="text-[10px] text-muted">
                {formatDate(day.date, { month: "short", day: "2-digit", year: undefined })}
              </span>
              <span className="text-[10px] text-navy font-medium">
                {day.bookings} bookings
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}