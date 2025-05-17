import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Prescription App</h1>
        <p className="text-lg mb-6">Manage prescriptions, track medications, and more.</p>
        <div className="space-x-4">
            <Link to="/login" className='bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600'>Login
            </Link>
            <Link to="/signup" className='bg-green-500 text-white p-2 rounded-md hover:bg-green-600'>
            Sign Up
            </Link>
        </div>
    </div>
</div>
);};
export default Home;