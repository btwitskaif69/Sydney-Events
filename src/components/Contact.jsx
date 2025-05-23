import React from 'react';

const Contact = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800 py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-600 mb-8">Contact Us</h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          We'd love to hear from you! Whether you have questions, feedback, or would like to
          collaborate with us, feel free to get in touch.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Write your message..."
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Send Message
          </button>
        </form>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Email</h2>
          <p className="text-gray-700">support@sydneyevents.com</p>

          <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">Location</h2>
          <p className="text-gray-700">Sydney, NSW, Australia</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
