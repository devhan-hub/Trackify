
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">Sorry, the page you are looking for does not exist.</p>
      <Link to="/login" className="mt-6 text-blue-500 hover:underline">Go back to Login</Link>
    </div>
  );
};

export default NotFound;