import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, verifyOTP } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await login({ email, password, userType: "admin" });
      
      // Check if OTP is required
      if (result?.requiresOTP) {
        setShowOTP(true);
        setMessage({ type: "success", text: result.message || "Verification code sent to your email. Please check your inbox." });
      } else {
        setMessage({ type: "success", text: "Login successful!" });
        
        // Redirect based on user role
        if (result?.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else if (result?.user?.role === "recruiter") {
          navigate("/recruiter/dashboard");
        } else {
          navigate("/admin/dashboard");
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid credentials. Please try again.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await verifyOTP({ email, otp });
      setMessage({ type: "success", text: "Verification successful! Logging you in..." });
      
      // Redirect to admin dashboard
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 500);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid verification code. Please try again.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <p className="title">{showOTP ? "Verify Your Identity" : "Login"}</p>
        
        {!showOTP ? (
          <form onSubmit={handleLogin} className="form">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <div className="forgot">
                <a rel="noopener noreferrer" href="#">Forgot Password ?</a>
              </div>
            </div>

            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}

            <button type="submit" className="sign" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPVerification} className="form">
            <div className="input-group">
              <label htmlFor="otp">Verification Code</label>
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                disabled={loading}
                maxLength={6}
                style={{ textAlign: "center", fontSize: "24px", letterSpacing: "8px", fontWeight: "bold" }}
              />
              <p style={{ fontSize: "14px", color: "#666", marginTop: "8px", textAlign: "center" }}>
                Check your email at <strong>pareshlheru@venushiring.com</strong> for the verification code
              </p>
            </div>

            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}

            <button type="submit" className="sign" disabled={loading || otp.length !== 6}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Verifying...
                </>
              ) : (
                "Verify Code"
              )}
            </button>
            
            <button
              type="button"
              onClick={() => {
                setShowOTP(false);
                setOtp("");
                setMessage({ type: "", text: "" });
              }}
              className="sign"
              style={{ marginTop: "10px", background: "#6b7280" }}
              disabled={loading}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
