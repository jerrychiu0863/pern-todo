import { useState, useEffect } from "react";
import { orderApi } from "../api/order";

export function useOrder() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setError(null);
    try {
      const orders = await orderApi.getAll();
      setOrders(orders);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const addOrder = async (order) => {
    setError(null);
    try {
      const newOrder = await orderApi.create(order);
      setOrders((prev) => [...prev, ...newOrder]);
    } catch (err) {
      console.error(err);
      setError("Failed to add order");
    }
  };

  const updateOrder = async (orderId, payload) => {
    setError(null);
    try {
      const updatedOrder = await orderApi.update(orderId, payload);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === parseInt(orderId)
            ? { ...order, ...updatedOrder }
            : order,
        ),
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update order");
    }
  };

  const deleteOrder = async (orderId) => {
    setError(null);
    try {
      await orderApi.delete(`${orderId}`);
      setOrders((prev) =>
        prev.filter((order) => order.id !== parseInt(orderId)),
      );
    } catch (err) {
      console.error(err);
      setError("Failed to delete order");
    }
  };

  return { orders, addOrder, updateOrder, deleteOrder, error };
}
