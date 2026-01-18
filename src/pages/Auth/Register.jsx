import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match! 🤔");
      return;
    }

    try {
      const res = await api.post("/auth/register", { name, email, password });
      setSuccess("Welcome aboard! 🎉 " + res.data.msg);
      setTimeout(() => navigate("/login"), 1800);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed 😞");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={submit} style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
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
          <small style={styles.hint}>
            Tip: Use 8+ chars with letters & numbers 🔒
          </small>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <p style={styles.footer}>
          Already a member? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

// Internal JSX CSS
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5", // subtle light gray instead of gradient
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#ffffff", // white card
    borderRadius: "16px",
    padding: "30px 25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.12)", // subtle shadow for depth
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
  hint: {
    fontSize: "12px",
    color: "#666",
    marginTop: "-10px",
    marginBottom: "10px",
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
};
