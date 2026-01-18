import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      setSuccess("Welcome back! 🎉 " + res.data.msg);
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed 😞");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login to Your Account</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={submit} style={styles.form}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

// Responsive internal CSS
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5", // subtle background
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    borderRadius: "16px",
    padding: "30px 25px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
    transition: "transform 0.3s",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
    fontFamily: "'Poppins', sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    fontSize: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "border 0.3s, box-shadow 0.3s",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    background: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "background 0.3s, transform 0.2s",
  },
  error: {
    background: "#ffe3e3",
    color: "#d32f2f",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },
  success: {
    background: "#e0f7e9",
    color: "#2e7d32",
    padding: "10px",
    borderRadius: "10px",
    textAlign: "center",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
  },

  // Media queries for mobile
  "@media(maxWidth: 480px)": {
    card: {
      padding: "25px 15px",
    },
    title: {
      fontSize: "20px",
    },
    input: {
      fontSize: "13px",
      padding: "10px 12px",
    },
    button: {
      fontSize: "15px",
      padding: "10px",
    },
  },
};
