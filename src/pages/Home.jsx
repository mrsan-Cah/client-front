import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import sampleBooks from "../data/sampleBooks";
import "../styles/main.css";

export default function Home() {
  const [books, setBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setBooks(sampleBooks);
  }, []);

  const handleProtectedClick = (action) => {
    if (!user) {
      alert("Please login to view this page");
    } else {
      // You can extend this to navigate somewhere if needed
      action && action();
    }
  };

  return (
    <div className="home-page">
      {/* Banner */}
      <div className="home-banner">
        <div className="banner-overlay">
          <div className="banner-text">
            <h1>Welcome to Online Bookstore</h1>
            <p>Explore & Buy Your Favorite Books</p>
            <button
              className="shop-now-btn"
              onClick={() => handleProtectedClick(() => console.log("Go to books section"))}
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Featured Books */}
      <div className="container">
        <h2 className="section-title">Featured Books</h2>
        <div className="books-grid">
          {books.map((book) => (
            <div
              key={book._id}
              onClick={() => handleProtectedClick(() => console.log(`View book ${book._id}`))}
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
