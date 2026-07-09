import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaShoppingCart, FaUserCircle, FaHeart } from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
          value={
            new URLSearchParams(window.location.search).get('search') || ''
          }
          onChange={(e) => {
            const value = e.target.value;

            if (value.trim()) {
              navigate(`/?search=${value}#products`);
            } else {
              navigate('/#products');
            }
          }}
          className="border rounded-lg px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          {user ? (
            <>
              {/* Buyer Links */}
              {user.role === 'student' && (
                <>
                  <Link to="/wishlist" className="hover:text-red-500">
                    Wishlist
                  </Link>

                  <Link to="/my-orders" className="hover:text-blue-600">
                    My Orders
                  </Link>
                </>
              )}

              {/* Seller Links */}
              {user.role === 'seller' && (
                <Link to="/seller-orders" className="hover:text-blue-600">
                  Orders
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>

              <Link to="/register" className="hover:text-blue-600">
                Register
              </Link>
            </>
          )}

          <Link to="/wishlist" className="hover:text-red-500">
            <FaHeart className="text-2xl" />
          </Link>

          <Link to="/cart" className="hover:text-blue-600">
            <FaShoppingCart className="text-2xl" />
          </Link>

          <Link to="/profile">
            <FaUserCircle className="text-3xl hover:text-blue-600" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
