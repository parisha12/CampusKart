import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CampusKart
        </Link>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded-lg px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-blue-600"
          >
            Products
          </Link>

          <Link
            to="/login"
            className="hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hover:text-blue-600"
          >
            Register
          </Link>

          <FaShoppingCart
            className="text-2xl cursor-pointer hover:text-blue-600"
          />

          <FaUserCircle
            className="text-3xl cursor-pointer hover:text-blue-600"
          />

        </div>
      </div>
    </nav>
  );
}

export default Navbar;