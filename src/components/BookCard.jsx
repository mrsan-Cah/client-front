// BookCard.jsx
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <div className="book-card" onClick={handleClick}>
      {/* Optional Ribbon for Featured/New Books */}
      {book.featured && <div className="ribbon">NEW</div>}

      <img src={book.image} alt={book.title} className="book-image" />
      <h3 className="book-title">{book.title}</h3>
      <p className="book-author">by {book.author}</p>
      <p className="book-price">₹{book.price}</p>

      {/* View Details Button */}
      <button className="auth-button" onClick={(e) => { e.stopPropagation(); handleClick(); }}>
        View Details
      </button>
    </div>
  );
};

export default BookCard;
