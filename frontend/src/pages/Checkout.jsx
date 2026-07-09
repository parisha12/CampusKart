import { useEffect, useState } from 'react';
import { getCart } from '../services/cartService';
import { placeOrder, initiateEsewaPayment } from '../services/orderService';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');

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

      // Create order first
      const order = await placeOrder(paymentMethod);

      console.log('ORDER RESPONSE:', JSON.stringify(order, null, 2));

      // COD flow
      if (paymentMethod === 'COD') {
        alert('Order placed successfully');
        navigate('/my-orders');
        return;
      }

      // eSewa flow
      const { paymentUrl, paymentData } = await initiateEsewaPayment(
        order.order._id
      );

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = paymentUrl;

      Object.keys(paymentData).forEach((key) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = paymentData[key];

        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || error.message || 'Order failed');
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

        <div className="mt-6">
          <h2 className="font-semibold mb-3">Select Payment Method</h2>

          <label className="flex items-center gap-2 mb-2">
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === 'COD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="eSewa"
              checked={paymentMethod === 'eSewa'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            eSewa
          </label>
        </div>

        <div className="text-xl font-bold mt-5">Total: Rs. {total}</div>

        <button
          onClick={handleOrder}
          disabled={loading}
          className="mt-5 bg-black text-white px-6 py-3 rounded"
        >
          {loading
            ? 'Processing...'
            : paymentMethod === 'COD'
              ? 'Place COD Order'
              : 'Pay with eSewa'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
