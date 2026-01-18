import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const [orderData, setOrderData] = useState({
    customerName: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  // Load cart
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(stored);
  }, []);

  // Sync cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("storage"));
  }, [cartItems]);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const handleCheckout = async () => {
    const { customerName, phone, address, paymentMethod } = orderData;

    if (!customerName || !phone || !address) {
      alert("Please fill all required fields");
      return;
    }

    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Backend-compatible items
      const items = cartItems.map((item) => ({
        bookId: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      }));

      const orderPayload = {
        customerName,
        phone,
        address,
        paymentMethod,
        items,
        totalAmount,
      };

      const res = await axios.post(
        "https://server-back-cofh.onrender.com/api/orders",
        orderPayload
      );

      // Store order for success page
      localStorage.setItem("order", JSON.stringify(res.data));

      // Clear cart
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("storage"));

      navigate("/success");
    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  if (!cartItems.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Your cart is empty!</h2>
        <button onClick={() => navigate("/")}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>

      {cartItems.map((item) => (
        <div key={item._id} className="cart-card">
          <img src={item.image} alt={item.title} />
          <div>
            <h3>{item.title}</h3>
            <p>by {item.author}</p>
            <p>₹{item.price}</p>

            <div className="qty">
              <button onClick={() => handleQuantityChange(item._id, -1)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item._id, 1)}>
                +
              </button>
            </div>

            <button
              className="remove"
              onClick={() => handleRemove(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {!showForm && (
        <div className="cart-summary">
          <h3>Total: ₹{totalAmount}</h3>
          <button onClick={() => setShowForm(true)}>
            Proceed to Checkout
          </button>
        </div>
      )}

      {showForm && (
        <div className="checkout-form">
          <h3>Delivery & Payment</h3>

          <input
            placeholder="Full Name"
            value={orderData.customerName}
            onChange={(e) =>
              setOrderData({ ...orderData, customerName: e.target.value })
            }
          />

          <input
            placeholder="Phone Number"
            value={orderData.phone}
            onChange={(e) =>
              setOrderData({ ...orderData, phone: e.target.value })
            }
          />

          <input
            placeholder="Delivery Address"
            value={orderData.address}
            onChange={(e) =>
              setOrderData({ ...orderData, address: e.target.value })
            }
          />

          <select
            value={orderData.paymentMethod}
            onChange={(e) =>
              setOrderData({
                ...orderData,
                paymentMethod: e.target.value,
              })
            }
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit / Debit Card</option>
          </select>

          <button onClick={handleCheckout} disabled={loading}>
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>
        </div>
      )}
    </div>
  );
}
