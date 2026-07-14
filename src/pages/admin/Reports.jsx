import { useState, useEffect } from "react";
import { DollarSign, TrendingUp, Ticket, BarChart3 } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../../components/ui/Card";
import Spinner from "../../components/ui/Spinner";
import StatCard from "../../components/admin/StatCard";
import { getRevenueReport, getBookingsReport } from "../../api/adminApi";
import { formatCurrency, getErrorMessage } from "../../utils/helpers";

export default function Reports() {
  const [revenue, setRevenue] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    setLoading(true);
    try {
      const [revenueData, bookingsData] = await Promise.all([
        getRevenueReport(),
        getBookingsReport(),
      ]);
      setRevenue(revenueData);
      setBookings(bookingsData);
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">Reports</h1>
      <p className="text-muted mb-6">Revenue and booking analytics</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Revenue" value={formatCurrency(revenue?.totalRevenue)} icon={DollarSign} accent="gold" />
        <StatCard label="Avg Ticket Price" value={formatCurrency(revenue?.averageTicketPrice)} icon={TrendingUp} accent="navy" />
        <StatCard label="Tickets Sold" value={revenue?.totalTicketsSold ?? 0} icon={Ticket} accent="green" />
        <StatCard label="Cancellation Rate" value={`${bookings?.cancellationRate ?? 0}%`} icon={BarChart3} accent="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-semibold text-navy mb-4">Top Routes</h3>
          {revenue?.topRoutes?.length ? (
            <div className="space-y-3">
              {revenue.topRoutes.map((route, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-navy font-medium">
                    {route.originIata} → {route.destinationIata}
                  </span>
                  <div className="text-right">
                    <p className="text-navy">{formatCurrency(route.revenue)}</p>
                    <p className="text-xs text-muted">{route.bookingCount} bookings</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-sm">No route data available.</p>
          )}
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-navy mb-4">Revenue by Airline</h3>
          {revenue?.revenueByAirline?.length ? (
            <div className="space-y-3">
              {revenue.revenueByAirline.map((airline, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-navy font-medium">{airline.airlineName}</span>
                  <div className="text-right">
                    <p className="text-navy">{formatCurrency(airline.revenue)}</p>
                    <p className="text-xs text-muted">{airline.bookingCount} bookings</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted text-sm">No airline data available.</p>
          )}
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-navy mb-4">Booking Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted">Total</span><span className="text-navy font-medium">{bookings?.totalBookings}</span></div>
            <div className="flex justify-between"><span className="text-muted">Confirmed</span><span className="text-navy font-medium">{bookings?.confirmed}</span></div>
            <div className="flex justify-between"><span className="text-muted">Cancelled</span><span className="text-navy font-medium">{bookings?.cancelled}</span></div>
            <div className="flex justify-between"><span className="text-muted">Expired</span><span className="text-navy font-medium">{bookings?.expired}</span></div>
            <div className="flex justify-between"><span className="text-muted">Refunded</span><span className="text-navy font-medium">{bookings?.refunded}</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
}