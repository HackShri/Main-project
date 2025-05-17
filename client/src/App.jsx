import React, { useContext } from 'react';
   import { BrowserRouter as Router, Route, Routes, Navigate } from 'https://cdn.jsdelivr.net/npm/react-router-dom@6.4.3/dist/umd/react-router-dom.min.js';
   import Navbar from './components/Navbar';
   import Login from './components/Login';
   import Signup from './components/Signup';
   import DoctorDashboard from './pages/DoctorDashboard';
   import PatientDashboard from './pages/PatientDashboard';
   import ShopDashboard from './pages/ShopDashboard';
   import AdminDashboard from './pages/AdminDashboard';
   import Home from './pages/Home';
   import { AuthContext } from './context/AuthContext';

   const AppContent = () => {
     const { user } = useContext(AuthContext);

     return (
       <Router>
         <div className="min-h-screen bg-gray-100">
           <Navbar />
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
             <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashboard" />} />
             <Route
               path="/dashboard"
               element={
                 user ? (
                   user.role === 'doctor' ? <DoctorDashboard /> :
                   user.role === 'patient' ? <PatientDashboard /> :
                   user.role === 'shop' ? <ShopDashboard /> :
                   <AdminDashboard />
                 ) : (
                   <Navigate to="/login" />
                 )
               }
             />
           </Routes>
         </div>
       </Router>
     );
   };

   const App = () => {
    <AuthProvider>
      <AppContent />
    </AuthProvider>
   }
   export default App;