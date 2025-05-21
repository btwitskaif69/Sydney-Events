import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Signin = ({ event, onClose }) => {
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      alert('You must agree to receive updates to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/emails/add-email`, { email });
      setMessage(response.data.message);
      setEmail('');
      setIsChecked(false);

      // Redirect to event page after a brief delay to show message (optional)
      setTimeout(() => {
        window.location.href = event.event_link;
      }, 500);
    } catch (err) {
      setIsSubmitting(false);
      if (err.response && err.response.data.error) {
        setMessage(err.response.data.error);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Get tickets for</h2>
        <p className="text-lg text-indigo-600 font-medium mb-6">{event.title}</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex items-start mb-4">
            <input
              type="checkbox"
              id="updates"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="updates" className="ml-2 text-sm text-gray-700">
              I want to receive updates about upcoming events in Sydney
            </label>
          </div>
          {message && (
            <p className={`text-sm mb-4 ${message.includes('error') ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-lg transition-all duration-150 ${
                isChecked ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-300 cursor-not-allowed'
              }`}
              disabled={!isChecked || isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Continue to Tickets'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
