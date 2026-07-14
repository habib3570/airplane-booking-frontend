import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">
        Welcome, {user?.firstName}!
      </h1>
      <p className="text-muted mb-6">Manage everything from your dashboard</p>
      <Card>
        <p className="text-sm text-muted">
          
        </p>
      </Card>
    </div>
  );
}