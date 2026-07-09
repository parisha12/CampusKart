import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const transactionId = searchParams.get('transaction_uuid');

    console.log('Payment Success Transaction:', transactionId);

    // Optional: clear cart after successful payment
    // add your clear cart API here if needed
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>

        <button
          onClick={() => navigate('/my-orders')}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
