// RoutesConfig.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import NotFound from "./pages/NotFound"; // optional 404 page

export default function RoutesConfig() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Book details with consistent 'books/:id' path */}
      <Route path="/books/:id" element={<BookDetails />} />

      {/* Cart & checkout */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/success" element={<OrderSuccess />} />

      {/* Optional: catch-all 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
