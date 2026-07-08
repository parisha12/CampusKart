import { useEffect, useState } from 'react';
import { getCart } from '../services/cartService';
import { placeOrder } from '../services/orderService';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const data = await getCart();
      setCart(data);
    };

    fetchCart();
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    try {
      setLoading(true);

      await placeOrder();

      alert('Order placed successfully');

      navigate('/my-orders');
    } catch (error) {
      alert(error.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="bg-white shadow rounded p-6">
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-3">
            <div>
              <h2 className="font-semibold">{item.product.title}</h2>

              <p>Quantity: {item.quantity}</p>
            </div>

            <p>Rs. {item.product.price * item.quantity}</p>
          </div>
        ))}

        <div className="text-xl font-bold mt-5">Total: Rs. {total}</div>

        <button
          onClick={handleOrder}
          disabled={loading}
          className="mt-5 bg-black text-white px-6 py-3 rounded"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
