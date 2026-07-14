import { useAuth } from "../../context/AuthContext";
import Card from "../../components/ui/Card";

export default function AdminHome() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-1">
        Admin Panel — {user?.firstName}
      </h1>
      <p className="text-muted mb-6">
        Full system control from here
      </p>
      <Card>
        <p className="text-sm text-muted">
          Dashboard stats, Users, Airlines, Airports, Flights CRUD will be added in the next phase.
        </p>
      </Card>
    </div>
  );
}