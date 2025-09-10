import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setMessage("✅ Login successful!");
      
      // Redirect based on user role
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user?.role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setMessage("❌ Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-light">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-primary mb-4">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-red-700"
        >
          Login
        </button>

        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
