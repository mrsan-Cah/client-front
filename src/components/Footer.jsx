import { useState } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage("Please enter a valid email 😅");
      return;
    }
    setMessage(`Thank you for subscribing, ${email}! 🎉`);
    setEmail("");
  };

  return (
    <footer style={styles.footer}>
      {/* Newsletter Section */}
      <div style={styles.newsletter}>
        <h3 style={styles.newsTitle}>Subscribe to Our Newsletter</h3>
        <p style={styles.newsText}>Get updates on new arrivals, offers & trending books 📚</p>
        <form onSubmit={handleSubscribe} style={styles.newsForm}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.newsInput}
          />
          <button
            type="submit"
            style={styles.newsButton}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            Subscribe
          </button>
        </form>
        {message && <p style={styles.newsMessage}>{message}</p>}
      </div>

      {/* Footer Content */}
      <div style={styles.container}>
        {/* Quick Links */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            {["Home","Cart","Categories","About Us","Contact"].map((link) => (
              <li
                key={link}
                style={styles.listItem}
                onClick={() => window.location.href = `/${link.toLowerCase().replace(" ","")}`}
                onMouseEnter={(e) => e.target.style.color = "#ffd700"}
                onMouseLeave={(e) => e.target.style.color = "#fff"}
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Contact Us</h4>
          <p style={styles.text}>📍 123 Book Street, Chennai, India</p>
          <p style={styles.text}>📧 support@bookstore.com</p>
          <p style={styles.text}>📞 +91 12345 67890</p>
        </div>

        {/* Social Media */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Follow Us</h4>
          <div style={styles.socialIcons}>
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
              <Icon
                key={i}
                style={styles.icon}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.3)";
                  e.target.style.color = "#ffd700";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.color = "#fff";
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={styles.copy}>
        &copy; {new Date().getFullYear()} BookStore. All rights reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "linear-gradient(135deg, #ff6f61, #ff856d)",
    color: "#fff",
    padding: "50px 20px 20px 20px",
    fontFamily: "'Poppins', sans-serif",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
  newsletter: {
    textAlign: "center",
    marginBottom: "40px",
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  },
  newsTitle: {
    fontSize: "22px",
    fontWeight: 700,
    marginBottom: "8px",
  },
  newsText: {
    fontSize: "14px",
    marginBottom: "15px",
  },
  newsForm: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "12px",
  },
  newsInput: {
    padding: "12px 15px",
    borderRadius: "10px",
    border: "none",
    fontSize: "14px",
    outline: "none",
    flex: "1 1 250px",
    transition: "all 0.3s",
  },
  newsButton: {
    padding: "12px 25px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#fff",
    color: "#ff6f61",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s",
  },
  newsMessage: {
    marginTop: "12px",
    fontSize: "14px",
    color: "#fff",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  section: {
    flex: "1 1 220px",
  },
  heading: {
    fontSize: "18px",
    marginBottom: "12px",
    fontWeight: 700,
    borderBottom: "2px solid rgba(255,255,255,0.3)",
    display: "inline-block",
    paddingBottom: "4px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: "10px",
    cursor: "pointer",
    color: "#fff",
    transition: "all 0.3s",
  },
  text: {
    margin: "6px 0",
    fontSize: "14px",
  },
  socialIcons: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  icon: {
    fontSize: "20px",
    cursor: "pointer",
    transition: "all 0.3s",
  },
  copy: {
    textAlign: "center",
    marginTop: "35px",
    fontSize: "14px",
    borderTop: "1px solid rgba(255,255,255,0.3)",
    paddingTop: "15px",
  },
};
