import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          My Profile
        </h1>

        {user ? (
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold text-gray-600">Name</h2>
              <p className="text-xl">{user.name}</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-600">Email</h2>
              <p className="text-xl">{user.email}</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-600">Role</h2>
              <p className="text-xl capitalize">{user.role}</p>
            </div>

            <div className="flex gap-4 mt-6">
              <Link
                to="/cart"
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
                My Cart
              </Link>

              <Link
                to="/products"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <p>No user data found</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
