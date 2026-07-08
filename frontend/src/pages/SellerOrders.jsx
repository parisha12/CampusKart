import { useEffect, useState } from 'react';
import { getSellerOrders, updateOrderStatus } from '../services/orderService';

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const data = await getSellerOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    const confirmUpdate = window.confirm(
      `Are you sure you want to change order status to ${status}?`
    );

    if (!confirmUpdate) return;

    try {
      await updateOrderStatus(id, status);

      alert('Order status updated');

      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';

      case 'Accepted':
        return 'bg-blue-100 text-blue-700';

      case 'Completed':
        return 'bg-green-100 text-green-700';

      case 'Cancelled':
        return 'bg-red-100 text-red-700';

      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Seller Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="bg-white shadow rounded-lg p-5 mb-5">
            <div className="flex justify-between items-center">
              <h2 className="font-bold">Buyer: {order.buyer?.name}</h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-gray-600">Email: {order.buyer?.email}</p>

            <div className="mt-4">
              <h3 className="font-semibold">Products:</h3>

              {order.items.map((item) => (
                <p key={item._id}>
                  {item.product?.title} × {item.quantity}
                </p>
              ))}
            </div>

            <p className="font-semibold mt-3">Total: Rs. {order.totalAmount}</p>

            {/* Action Buttons */}

            <div className="flex gap-3 mt-4">
              {order.status === 'Pending' && (
                <>
                  <button
                    onClick={() => handleStatusUpdate(order._id, 'Accepted')}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Accept Order
                  </button>

                  <button
                    onClick={() => handleStatusUpdate(order._id, 'Cancelled')}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Cancel Order
                  </button>
                </>
              )}

              {order.status === 'Accepted' && (
                <button
                  onClick={() => handleStatusUpdate(order._id, 'Completed')}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Mark Completed
                </button>
              )}

              {(order.status === 'Completed' ||
                order.status === 'Cancelled') && (
                <p className="text-gray-500">No actions available</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerOrders;
