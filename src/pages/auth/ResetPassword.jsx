import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import AuthLayout from "../../layout/AuthLayout";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import axiosClient from "../../api/axiosClient";
import { isValidPassword } from "../../utils/validators";
import { getErrorMessage } from "../../utils/helpers";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!token || !email) {
      toast.error("Invalid or expired link");
      return;
    }

    const validationErrors = {};
    if (!isValidPassword(form.newPassword)) {
      validationErrors.newPassword =
        "Must have at least 8 characters, including uppercase, lowercase, a number and a special character";
    }
    if (form.confirmPassword !== form.newPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await axiosClient.post("/api/v1/auth/reset-password", {
        token,
        email,
        newPassword: form.newPassword,
      });
      toast.success("Password changed successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Enter your new password below"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="New Password"
          name="newPassword"
          type="password"
          icon={Lock}
          value={form.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          required
        />
        <Input
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          icon={Lock}
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
        >
          Change Password
        </Button>
      </form>

      <p className="text-center text-sm text-muted mt-6">
        <Link to="/login" className="text-navy font-semibold hover:text-gold-dark">
          Back to Login
        </Link>
      </p>
    </AuthLayout>
  );
}