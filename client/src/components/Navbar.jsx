import React, { useState, useContext } from 'react';
   import axios from 'axios';
   import { useNavigate } from 'react-router-dom';
   import { AuthContext } from '../context/AuthContext.jsx';

   const Login = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const { login } = useContext(AuthContext);
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
       e.preventDefault();
       setError('');
       try {
         const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
         login(data.token);
         navigate('/dashboard');
       } catch (err) {
         setError(err.response?.data?.message || 'Login failed');
       }
     };

     return (
       <div className="min-h-screen bg-gray-100 flex items-center justify-center">
         <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
           <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
           {error && <p className="text-red-500 mb-4">{error}</p>}
           <div onSubmit={handleSubmit} className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700">Email</label>
               <input
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 required
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700">Password</label>
               <input
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                 required
               />
             </div>
             <button
               type="submit"
               onClick={handleSubmit}
               className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
             >
               Login
             </button>
           </div>
           <p className="mt-4 text-center">
             Don't have an account?{' '}
             <a href="/signup" className="text-blue-500 hover:underline">
               Sign Up
             </a>
           </p>
         </div>
       </div>
     );
   };

   export default Login;