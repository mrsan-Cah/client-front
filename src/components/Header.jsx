import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaFire } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartCount, setCartCount] = useState(0);
  const [pop, setPop] = useState(false);
  const [hot, setHot] = useState(false); // trending animation

  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = storedCart.reduce((acc, item) => acc + (item.quantity || 1), 0);

      if (count > cartCount) {
        setPop(true);
        setHot(true); // trigger trending effect
        setTimeout(() => setPop(false), 300);
        setTimeout(() => setHot(false), 1500); // trending animation for 1.5s
      }

      setCartCount(count);
    };

    updateCart();

    const handleStorage = () => updateCart();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [cartCount]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleProtectedClick = (e, path) => {
    if (!user) {
      e.preventDefault();
      alert("Please login to view this page");
    } else {
      navigate(path);
    }
  };

  return (
    <header style={styles.header}>
      {/* Logo */}
      <h2 style={styles.logo} onClick={(e) => handleProtectedClick(e, "/")}>
        📚 BookStore
      </h2>

      {/* Navigation */}
      <nav style={styles.nav}>
        {/* Home */}
        <span
          onClick={(e) => handleProtectedClick(e, "/")}
          style={styles.navItem}
        >
          <FaHome style={{ marginRight: 6 }} />
          Home
        </span>

        {/* Cart */}
        <span
          onClick={(e) => handleProtectedClick(e, "/cart")}
          style={{ ...styles.navItem, position: "relative" }}
        >
          <FaShoppingCart style={{ marginRight: 6 }} />
          Cart
          {cartCount > 0 && (
            <span
              style={{
                ...styles.badge,
                transform: pop ? "scale(1.5)" : "scale(1)",
                backgroundColor: hot ? "#ff5722" : "#ff3b2e",
              }}
            >
              {cartCount}
              {hot && <FaFire style={{ marginLeft: 2, fontSize: 10 }} />}
            </span>
          )}
        </span>

        {/* User / Login */}
        {user ? (
          <div style={styles.userSection}>
            <FaUser style={{ marginRight: 5 }} />
            Hello, {user.name || "User"}
            <button style={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <span onClick={() => navigate("/login")} style={styles.loginBtn}>
            <FaUser style={{ marginRight: 6 }} />
            Login
          </span>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 30px",
    backgroundColor: "#ff6f61",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  logo: {
    margin: 0,
    cursor: "pointer",
    fontSize: "1.6rem",
    fontWeight: 700,
    letterSpacing: "1px",
  },
  nav: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  navItem: {
    cursor: "pointer",
    color: "#fff",
    fontWeight: 600,
    padding: "6px 12px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    transition: "background 0.3s",
  },
  badge: {
    position: "absolute",
    top: "-6px",
    right: "-10px",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "#fff",
    transition: "transform 0.3s, background 0.3s",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#fff",
    color: "#ff6f61",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: 600,
  },
  logoutBtn: {
    backgroundColor: "#ff6f61",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "4px 10px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "opacity 0.2s",
  },
  loginBtn: {
    cursor: "pointer",
    padding: "6px 15px",
    backgroundColor: "#fff",
    color: "#ff6f61",
    borderRadius: "8px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    transition: "opacity 0.3s",
  },
};
