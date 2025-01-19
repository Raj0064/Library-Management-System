import { Copyright, Facebook } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="mx-auto max-w-screen-xl border-t border-gray-300 shadow-lg py-6 flex flex-col md:flex-row items-center justify-between bg-white">
      <div className="px-4 text-center md:text-left">
        <h1 className="text-xl font-semibold text-gray-800">Job Hunt</h1>
        <p className="text-sm text-gray-500">
          © 2024 Your Company. All rights reserved.
        </p>
      </div>
      <div className="flex space-x-4 mt-4 md:mt-0">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54v-2.89h2.54v-2.198c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.56v1.872h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001zm.02 6.981H3v9.519h2V10.48zM8.482 10.48h2V12c.38-.733 1.343-1.667 2.9-1.667 3.1 0 3.667 2.1 3.667 4.833v4.333H15V15.5c0-2.05-.167-3.5-2.167-3.5-2 0-2.667 1.6-2.667 3.5v4.333h-2V10.48z" />
          </svg>
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.532A8.348 8.348 0 0 0 22 5.92a8.19 8.19 0 0 1-2.357.646A4.118 4.118 0 0 0 21.448 4.1a8.233 8.233 0 0 1-2.605.995 4.107 4.107 0 0 0-6.993 3.743A11.65 11.65 0 0 1 3.6 4.92a4.108 4.108 0 0 0 1.27 5.482A4.072 4.072 0 0 1 2.8 9.5v.052a4.108 4.108 0 0 0 3.292 4.021 4.096 4.096 0 0 1-1.852.07 4.108 4.108 0 0 0 3.833 2.85A8.233 8.233 0 0 1 2 18.108a11.616 11.616 0 0 0 6.29 1.84" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Footer;
