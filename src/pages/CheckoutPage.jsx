import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { product, variant, quantity } = location.state || {};
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!product) navigate('/', { replace: true });
  }, [product, navigate]);

  if (!product) return null;

  // Validation functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validateCardNumber = (num) => /^[0-9]{16}$/.test(num.replace(/\s+/g, ''));
  const validateExpiry = (expiry) => {
    const [month, year] = expiry.split('/').map(s => s.trim());
    if (!month || !year) return false;
    const expDate = new Date(`20${year}`, month - 1);
    const now = new Date();
    return expDate > now;
  };
  const validateCVV = (cvv) => /^[0-9]{3}$/.test(cvv);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!form.fullName) tempErrors.fullName = 'Full name is required';
    if (!validateEmail(form.email)) tempErrors.email = 'Invalid email';
    if (!validatePhone(form.phone)) tempErrors.phone = 'Invalid phone number';
    if (!form.address) tempErrors.address = 'Address is required';
    if (!form.city) tempErrors.city = 'City is required';
    if (!form.state) tempErrors.state = 'State is required';
    if (!form.zip) tempErrors.zip = 'Zip code is required';
    if (!validateCardNumber(form.cardNumber)) tempErrors.cardNumber = 'Invalid card number';
    if (!validateExpiry(form.expiry)) tempErrors.expiry = 'Invalid expiry date';
    if (!validateCVV(form.cvv)) tempErrors.cvv = 'Invalid CVV';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setProcessing(true);
    try {
      const response = await axios.post('http://localhost:5000/api/orders', {
        ...form,
        productId: product.id || product._id,
        variant,
        quantity,
        transactionSim: '1' // Change this to '2' or '3' to simulate failure or error
      });

      // Redirect to Razorpay hosted payment page
      const paymentLink = response.data.paymentLink;
      window.location.href = paymentLink;
    } catch (err) {
      console.error('Order creation failed:', err);
      alert('Order failed to process. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">Order Summary</h2>
        <p>{product.title || product.name} {variant ? `(${variant})` : ''}</p>
        <p>Quantity: {quantity}</p>
        <p className="font-semibold">Total: ₹{product.price * quantity}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {[
          { label: 'Full Name', name: 'fullName' },
          { label: 'Email', name: 'email' },
          { label: 'Phone Number', name: 'phone' },
          { label: 'Address', name: 'address' },
          { label: 'City', name: 'city' },
          { label: 'State', name: 'state' },
          { label: 'Zip Code', name: 'zip' },
          { label: 'Card Number', name: 'cardNumber' },
          { label: 'Expiry Date (MM/YY)', name: 'expiry' },
          { label: 'CVV', name: 'cvv', type: 'password' }
        ].map(({ label, name, type = 'text' }) => (
          <div key={name} className="mb-4">
            <label className="block font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              className={`border p-2 rounded w-full ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700 transition"
        >
          {processing ? 'Processing...' : 'Proceed to Pay'}
        </button>
      </form>
    </div>
  );
}
