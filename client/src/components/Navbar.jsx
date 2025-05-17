import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Prescription App
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-white capitalize">{user.role}</span>
              <button
                onClick={logout}
                className="text-white hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;