import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  console.log('Navbar user:', user);

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
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>

          {user ? (
            <>
              <Link to="/profile" className="hover:text-blue-600">
                Profile
              </Link>

              {/* Seller Orders */}
              {user.role === 'seller' && (
                <Link to="/seller-orders" className="hover:text-blue-600">
                  Orders
                </Link>
              )}

              {/* Buyer My Orders */}
              {user.role === 'student' && (
                <Link to="/my-orders" className="hover:text-blue-600">
                  My Orders
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

          {/* Cart visible for everyone */}
          <Link to="/cart" className="hover:text-blue-600">
            Cart
          </Link>

          <FaShoppingCart className="text-2xl cursor-pointer hover:text-blue-600" />

          <Link to="/profile">
            <FaUserCircle className="text-3xl cursor-pointer hover:text-blue-600" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
