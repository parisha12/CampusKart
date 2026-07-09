import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Failed ❌
        </h1>

        <p className="text-gray-600 mb-6">
          Payment was not completed. Please try again.
        </p>

        <button
          onClick={() => navigate('/cart')}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default PaymentFailed;
