import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(`/products?search=${search}`);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          CampusKart
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          <Link to="/products" className="hover:text-blue-600">
            Products
          </Link>

          <Link to="/login" className="hover:text-blue-600">
            Login
          </Link>

          <Link to="/register" className="hover:text-blue-600">
            Register
          </Link>

          <FaShoppingCart className="text-2xl cursor-pointer hover:text-blue-600" />

          <FaUserCircle className="text-3xl cursor-pointer hover:text-blue-600" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
