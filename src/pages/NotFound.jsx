import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-soft px-4">
      <div className="text-center">
        <h1 className="text-7xl font-heading font-bold text-navy mb-2">404</h1>
        <p className="text-muted mb-6">Page not found</p>
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}