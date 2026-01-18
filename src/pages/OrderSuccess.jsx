// OrderSuccess.jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/cart.css";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem("order"));

  useEffect(() => {
    if (!order) navigate("/");
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎉 Order Placed Successfully!</h1>
      <p style={styles.subtitle}>
        Thank you for shopping with us 📚 <br />
        Your order will be delivered soon.
      </p>

      {/* Customer Info */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>👤 Customer Details</h3>
        <p><b>Name:</b> {order.customerName}</p>
        <p><b>Phone:</b> {order.phone}</p>
        <p><b>Address:</b> {order.address}</p>
        <p><b>Payment:</b> {order.paymentMethod}</p>
      </div>

      {/* Order Items */}
      <div style={{ ...styles.card, marginTop: 20 }}>
        <h3 style={styles.cardTitle}>📚 Ordered Books</h3>
        {order.items.map((item, idx) => (
          <div key={idx} style={styles.itemRow}>
            <div>
              <p style={{ margin: 0 }}><b>{item.title}</b></p>
              <small>Qty: {item.quantity}</small>
            </div>
            <p>₹{item.price * item.quantity}</p>
          </div>
        ))}
        <h3 style={styles.total}>Total: ₹{order.totalAmount}</h3>
      </div>

      {/* Status Info */}
      <div style={styles.statusCard}>
        <h3>📦 What happens next?</h3>
        <ul style={styles.statusList}>
          <li>Your order is confirmed</li>
          <li>We are preparing your books</li>
          <li>Delivery partner will contact you</li>
          <li>Payment collected on delivery (if COD)</li>
        </ul>
      </div>

      {/* Continue Shopping */}
      <div style={{ textAlign: "center" }}>
        <button style={styles.button} onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

// Internal Styles
const styles = {
  container: {
    maxWidth: 900,
    margin: "50px auto",
    padding: 30,
    fontFamily: "'Poppins', sans-serif",
    background: "#ffffff",
    borderRadius: 16,
    boxShadow: "0 10px 35px rgba(0,0,0,0.1)",
  },
  title: {
    color: "#16a34a",
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: 800,
    marginBottom: 15,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: "1.15rem",
    color: "#444",
  },
  card: {
    padding: 25,
    borderRadius: 12,
    background: "#f9fafb",
    boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
    transition: "transform 0.3s",
  },
  cardTitle: {
    fontSize: "1.4rem",
    marginBottom: 15,
    fontWeight: 600,
    color: "#2563eb",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  total: {
    textAlign: "right",
    marginTop: 15,
    fontSize: "1.3rem",
    color: "#16a34a",
  },
  statusCard: {
    background: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginTop: 25,
    boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
  },
  statusList: {
    lineHeight: 1.8,
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    padding: "14px 28px",
    background: "linear-gradient(45deg, #2563eb, #1d4ed8)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  },
  buttonHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
  },
};
