import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";
import AuthLayout from "../../layout/AuthLayout";
import Button from "../../components/ui/Button";
import Spinner from "../../components/ui/Spinner";
import axiosClient from "../../api/axiosClient";
import { getErrorMessage } from "../../utils/helpers";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function verify() {
      if (!token || !email) {
        setStatus("error");
        setErrorMsg("Invalid verification link");
        return;
      }
      try {
        await axiosClient.post("/api/v1/auth/verify-email", { token, email });
        setStatus("success");
      } catch (error) {
        setStatus("error");
        setErrorMsg(getErrorMessage(error));
      }
    }
    verify();
  }, [token, email]);

  return (
    <AuthLayout title="Email Verification">
      <div className="text-center py-6">
        {status === "loading" && (
          <>
            <Spinner size={40} className="text-navy mx-auto mb-4" />
            <p className="text-muted">Verifying...</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-green-600" size={32} />
            </div>
            <p className="text-navy font-medium mb-6">
              Your email has been verified successfully!
            </p>
            <Link to="/login">
              <Button variant="primary" className="w-full">
                Log In
              </Button>
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <XCircle className="text-red-600" size={32} />
            </div>
            <p className="text-navy font-medium mb-2">Verification failed</p>
            <p className="text-muted text-sm mb-6">{errorMsg}</p>
            <Link to="/login">
              <Button variant="outline" className="w-full">
                Back to Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </AuthLayout>
  );
}