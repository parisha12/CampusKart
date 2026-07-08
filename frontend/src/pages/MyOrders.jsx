import { useEffect, useState } from 'react';
import { getMyOrders, cancelOrder } from '../services/orderService';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const handleCancelOrder = async (id) => {
    try {
      await cancelOrder(id);

      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to cancel order');
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getMyOrders();

      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white shadow rounded p-5 mb-5">
            <h2 className="font-bold">Order ID: {order._id}</h2>

            <div className="mt-3">
              {order.items.map((item) => (
                <p key={item._id}>
                  {item.product.title} x {item.quantity}
                </p>
              ))}
            </div>

            <p className="font-semibold mt-3">Total: Rs. {order.totalAmount}</p>

            <p>Status: {order.status || 'Pending'}</p>

            {(order.status || 'Pending') === 'Pending' && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
