import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaUser,
  FaFire,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [cartCount, setCartCount] = useState(0);
  const [pop, setPop] = useState(false);
  const [hot, setHot] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  /* ---------- Responsive ---------- */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- Cart Count ---------- */
  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce(
        (sum, item) => sum + (item.quantity || 1),
        0
      );

      if (count > cartCount) {
        setPop(true);
        setHot(true);
        setTimeout(() => setPop(false), 300);
        setTimeout(() => setHot(false), 1500);
      }
      setCartCount(count);
    };

    updateCart();
    window.addEventListener("storage", updateCart);
    return () => window.removeEventListener("storage", updateCart);
  }, [cartCount]);

  const go = (path) => {
    if (!user) return alert("Please login first");
    navigate(path);
    setMenuOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      {/* Logo */}
      <h2 style={styles.logo} onClick={() => navigate("/")}>
        📚 BookStore
      </h2>

      {/* Hamburger */}
      {isMobile && (
        <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      )}

      {/* Nav (Desktop + Mobile) */}
      <nav
        style={{
          ...styles.nav,
          ...(isMobile ? styles.mobileNav : {}),
          ...(isMobile && !menuOpen ? { display: "none" } : {}),
        }}
      >
        {/* Home */}
        <span style={styles.navItem} onClick={() => go("/")}>
          <FaHome /> Home
        </span>

        {/* Cart */}
        <span
          style={{ ...styles.navItem, position: "relative" }}
          onClick={() => go("/cart")}
        >
          <FaShoppingCart /> Cart
          {cartCount > 0 && (
            <span
              style={{
                ...styles.badge,
                transform: pop ? "scale(1.4)" : "scale(1)",
                backgroundColor: hot ? "#ff5722" : "#ff3b2e",
              }}
            >
              {cartCount}
              {hot && <FaFire style={{ fontSize: 10, marginLeft: 2 }} />}
            </span>
          )}
        </span>

        {/* User */}
        {user ? (
          <div style={styles.userBox}>
            <FaUser /> {user.name || "User"}
            <button onClick={logout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        ) : (
          <span style={styles.loginBtn} onClick={() => navigate("/login")}>
            <FaUser /> Login
          </span>
        )}
      </nav>
    </header>
  );
}
const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px",
    backgroundColor: "#ff6f61",
    color: "#fff",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    cursor: "pointer",
    fontSize: "1.5rem",
    fontWeight: 700,
  },
  hamburger: {
    fontSize: "1.6rem",
    cursor: "pointer",
  },
  nav: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
  },
  mobileNav: {
    position: "absolute",
    top: "65px",
    right: "15px",
    background: "#fff",
    color: "#ff6f61",
    flexDirection: "column",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    width: "200px",
  },
  navItem: {
    cursor: "pointer",
    fontWeight: 600,
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-10px",
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "0.7rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userBox: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    background: "#fff",
    color: "#ff6f61",
    padding: "6px 10px",
    borderRadius: "8px",
    fontWeight: 600,
  },
  logoutBtn: {
    border: "none",
    background: "#ff6f61",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  loginBtn: {
    cursor: "pointer",
    background: "#fff",
    color: "#ff6f61",
    padding: "6px 10px",
    borderRadius: "8px",
    fontWeight: 600,
    display: "flex",
    gap: 6,
    alignItems: "center",
  },
};
