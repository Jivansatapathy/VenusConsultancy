import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await login({ email, password, userType: "admin" });
      setMessage({ type: "success", text: "Login successful!" });
      
      // Redirect based on user role
      if (result?.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (result?.user?.role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setMessage({ type: "error", text: "Invalid credentials. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>Admin / Recruiter Login</h1>
            <p>Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
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

            <div className="form-group">
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
            </div>

            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>Test Credentials:</p>
            <div className="credentials">
              <div>
                <strong>Admin:</strong> admin@venusconsultancy.com / admin123
              </div>
              <div>
                <strong>Recruiter:</strong> recruiter@venusconsultancy.com / recruiter123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
