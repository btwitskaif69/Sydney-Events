import React from 'react';
import logo from '../assets/logo.svg'; // Adjust path if needed

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 mt-16 border-t">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & Description */}
        <div>
           <img src={logo} alt="Sydney Events Logo" className="h-8 w-auto mr-2" />
            <h2 className="text-xl font-bold text-indigo-600">Sydney Events</h2>
          <p className="text-sm text-gray-600">
            Discover and attend the most exciting events in Sydney. Curated experiences,
            workshops, and more—all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-indigo-500 transition">Home</a></li>
            <li><a href="/about" className="hover:text-indigo-500 transition">About</a></li>
            <li><a href="/contact" className="hover:text-indigo-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-md font-semibold mb-3">Contact Us</h3>
          <p className="text-sm mb-2">Email: <a href="mailto:info@sydneyevents.com" className="text-indigo-600 hover:underline">info@sydneyevents.com</a></p>
          <p className="text-sm">Phone: <a href="tel:+61123456789" className="text-indigo-600 hover:underline">+61 123 456 789</a></p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-indigo-600"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-indigo-600"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-indigo-600"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-xs text-gray-400 mt-10 border-t pt-5">
        &copy; {new Date().getFullYear()} Sydney Events. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
