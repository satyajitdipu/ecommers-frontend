import React, { useEffect, useState } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ThankYouPage() {
  const { orderId } = useParams(); // from /thank-you/:orderId
  const [searchParams] = useSearchParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const razorpay_payment_id = searchParams.get('razorpay_payment_id');
    const razorpay_payment_link_id = searchParams.get('razorpay_payment_link_id');
    const razorpay_payment_link_reference_id = searchParams.get('razorpay_payment_link_reference_id');
    const razorpay_payment_link_status = searchParams.get('razorpay_payment_link_status');
    const razorpay_signature = searchParams.get('razorpay_signature');

    // Function to fetch order data
    function fetchOrderData(orderId) {
      axios
        .get(`http://localhost:5000/api/payment/order/${orderId}`)
        .then((res) => {
          setOrder(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load order details.');
          setLoading(false);
        });
    }

 if (razorpay_payment_id && razorpay_payment_link_status === 'paid') {
  axios
    .post('http://localhost:5000/api/payment/save-payment', {
      razorpay_payment_id,
      razorpay_order_id: razorpay_payment_link_id,
      razorpay_signature,
      order_id: razorpay_payment_link_reference_id,
      status: 'success'
    })
    .then(() => {
      // Payment saved successfully, fetch order data
      fetchOrderData(orderId);
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        // Payment already exists, still fetch order data
        fetchOrderData(orderId);
      } else {
        setError('Failed to save payment info.');
        setLoading(false);
      }
    });
} else {
  fetchOrderData(orderId);
}


  }, [orderId, searchParams]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading order details...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Thank You for Your Order!</h1>

      <div className="mb-4 text-gray-700">
        <p className="mb-2">
          <strong>Order Number:</strong> #{orderId}
        </p>
        <p className="mb-2">
          <strong>Product:</strong> {order.title || 'N/A'}
        </p>
        <p className="mb-2">
          <strong>Variant:</strong> {order.variant || 'Default'}
        </p>
        <p className="mb-2">
          <strong>Price:</strong> ₹{order.price}
        </p>
        <p className="mb-2">
          <strong>Quantity:</strong> {order.quantity}
        </p>
        <p className="mb-2">
          <strong>Customer Name:</strong> {order.fullName}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {order.email}
        </p>
        <p className="mb-2">
          <strong>Payment Status:</strong>{' '}
          <span className="text-green-600 font-semibold">Paid</span>
        </p>
      </div>

      <div className="mt-6 p-4 bg-green-100 text-green-700 rounded text-sm">
        Your payment was successful and your order is confirmed.
      </div>

      <Link
        to="/"
        className="inline-block mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
