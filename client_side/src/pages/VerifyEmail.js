import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const hasFiredRef = useRef(false);
  const [resending, setResending] = useState(false); // 🔄 Spinner control for resend

  useEffect(() => {
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;

    const id = searchParams.get("id");
    const hash = searchParams.get("hash");
    const expires = searchParams.get("expires");
    const signature = searchParams.get("signature");

    if (id && hash && expires && signature) {
      const verificationUrl = `http://localhost:8000/api/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`;

      axios
        .get(verificationUrl)
        .then(() => {
          setStatus("success");
          Swal.fire({
            icon: "success",
            title: "Email Verified",
            text: "Your email has been successfully verified! Redirecting to login...",
            timer: 3000,
            showConfirmButton: false,
          });
          setTimeout(() => navigate("/login"), 3000);
        })
        .catch(() => {
          setStatus("error");
          Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text: "Invalid or expired verification link.",
          });
        });
    } else {
      setStatus("error");
      Swal.fire({
        icon: "error",
        title: "Invalid Link",
        text: "Missing required verification parameters.",
      });
    }
  }, [searchParams, navigate]);

  // 🔁 Resend handler
  const handleResend = async () => {
    const { value: email } = await Swal.fire({
      title: "Resend Verification",
      input: "email",
      inputLabel: "Enter your registered email",
      inputPlaceholder: "example@email.com",
      showCancelButton: true,
    });

    if (email) {
      try {
        setResending(true); // 🌀 Show spinner
        await axios.post("http://localhost:8000/api/email/resend", { email });
        Swal.fire("Sent!", "Verification email has been resent.", "success");
      } catch (err) {
        Swal.fire(
          "Error",
          err.response?.data?.message || "Something went wrong",
          "error"
        );
      } finally {
        setResending(false); // ⛔ Hide spinner
      }
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "50vh" }}
    >
      <div className="text-center">
        {/* Loading Spinner */}
        {status === "loading" && (
          <>
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Verifying...</span>
            </div>
            <h5 className="text-muted">Verifying your email, please wait...</h5>
          </>
        )}

        {/* Error State with Resend Option */}
        {status === "error" && (
          <div className="card shadow p-4">
            <h4 className="text-danger mb-3">Verification Failed</h4>
            <p className="text-muted">
              The verification link is either invalid or expired. <br />
              Please re-enter your email below to receive a new verification
              link.
            </p>

            <button
              onClick={handleResend}
              className="resend-button mt-3"
              disabled={resending}
            >
              {resending ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sending...
                </>
              ) : (
                <>
                  <i className="bi bi-envelope-arrow-up me-2"></i>
                  Resend Verification Email
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
