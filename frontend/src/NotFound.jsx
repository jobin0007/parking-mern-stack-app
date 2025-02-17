// src/pages/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center  bg-gray-100 p-4">
      <div className="text-center max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4">404 - Page Not Found</h1>
        <p className="text-lg sm:text-xl text-gray-700">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
