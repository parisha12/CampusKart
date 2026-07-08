import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from '../services/cartService';

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrease = async (productId, quantity) => {
    try {
      await updateCartQuantity(productId, quantity + 1);
      fetchCart();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleDecrease = async (productId, quantity) => {
    if (quantity <= 1) {
      return;
    }

    try {
      await updateCartQuantity(productId, quantity - 1);
      fetchCart();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCart();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item._id} className="border p-4 mb-4 rounded">
              <h2 className="text-xl font-semibold">{item.product.title}</h2>

              <p>Price: Rs. {item.product.price}</p>

              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => handleDecrease(item._id, item.quantity)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  -
                </button>

                <span className="font-semibold">{item.quantity}</span>

                <button
                  onClick={() => handleIncrease(item._id, item.quantity)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item._id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="bg-green-600 text-white px-5 py-2 rounded"
              >
                Checkout
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
