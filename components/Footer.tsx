"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 bg-gray-100 px-4 py-8 text-sm">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-4">Information</h4>
          <a
            href="tel:+917977481302"
            className="text-gray-600 hover:underline block mb-2"
          >
            Talk To Us
          </a>
          {/* <a href="#" className="text-gray-600 hover:underline block mb-2">
            Shipping In India
          </a>
          <a href="#" className="text-gray-600 hover:underline block mb-2">
            International Shipping
          </a> */}
          <a
            href="/return-and-refund"
            className="text-gray-600 hover:underline block mb-2"
          >
            Returns and Refunds
          </a>
        </div>
        <div>
          <h4 className="font-bold mb-4">Customer Service</h4>
          <a
            href="/return-and-refund"
            className="text-gray-600 hover:underline block mb-2"
          >
            Returns & Exchanges
          </a>
          {/* <a href="#" className="text-gray-600 hover:underline block mb-2">
            Track Your Order
          </a> */}
        </div>
        <div>
          <h4 className="font-bold mb-4">Shop</h4>
          <a href="#" className="text-gray-600 hover:underline block mb-2">
            Flags
          </a>
          <a href="#" className="text-gray-600 hover:underline block mb-2">
            Batches
          </a>
        </div>
        <div>
          <h4 className="font-bold mb-4">Policies</h4>
          <a
            href="/terms-and-services"
            className="text-gray-600 hover:underline block mb-2"
          >
            Terms of Service
          </a>
          <a
            href="/return-and-refund"
            className="text-gray-600 hover:underline block mb-2"
          >
            Refund Policy
          </a>
          <a
            href="/privacy-policy"
            className="text-gray-600 hover:underline block mb-2"
          >
            Privacy Policy
          </a>
        </div>
      </div>
      <div className="flex justify-between items-center mt-8 border-t border-gray-300 pt-4 pb-10">
        <span className="text-gray-600 pb-10">
          &copy; 2024 Kohinoor Flags & Batches
        </span>
        <div className="text-gray-600 pb-10">
          {/* Insert social media icons here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
