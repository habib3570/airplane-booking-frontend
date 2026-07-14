import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import Button from "../components/ui/Button";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-soft px-4">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="text-red-600" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-navy mb-2">Access Denied</h1>
        <p className="text-muted mb-6">
          You don't have permission to view this page
        </p>
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}