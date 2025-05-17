import React, { useState, useEffect } from 'react';
   import axios from 'axios';

   const AdminDashboard = () => {
     const [verifications, setVerifications] = useState([]);
     const [users, setUsers] = useState([]);
     const [prescriptions, setPrescriptions] = useState([]);

     useEffect(() => {
       const fetchData = async () => {
         try {
           const { data: verificationData } = await axios.get('http://localhost:5000/api/verification/pending', {
             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
           });
           const { data: userData } = await axios.get('http://localhost:5000/api/users', {
             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
           });
           const { data: prescriptionData } = await axios.get('http://localhost:5000/api/prescriptions', {
             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
           });
           setVerifications(verificationData);
           setUsers(userData);
           setPrescriptions(prescriptionData);
         } catch (error) {
           console.error('Error fetching data:', error);
         }
       };
       fetchData();
     }, []);

     const handleVerification = async (id, status) => {
       try {
         await axios.put(`http://localhost:5000/api/verification/${id}`, { status }, {
           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
         });
         setVerifications(verifications.filter(v => v._id !== id));
       } catch (error) {
         alert('Error updating verification');
       }
     };

     return (
       <div className="min-h-screen bg-gray-100 p-6">
         <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
         {/* Doctor Verification */}
         <div className="mb-10">
           <h3 className="text-2xl font-bold mb-4">Doctor Verification</h3>
           <div className="bg-white rounded shadow-md overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="bg-gray-200">
                   <th className="p-2 text-left">Doctor</th>
                   <th className="p-2 text-left">License Number</th>
                   <th className="p-2 text-left">Document</th>
                   <th className="p-2 text-left">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {verifications.map(v => (
                   <tr key={v._id} className="border-t">
                     <td className="p-2">{v.doctorId.name}</td>
                     <td className="p-2">{v.licenseNumber}</td>
                     <td className="p-2"><a href={v.documentUrl} className="text-blue-500">View</a></td>
                     <td className="p-2">
                       <button
                         onClick={() => handleVerification(v._id, 'approved')}
                         className="bg-green-500 text-white p-1 rounded mr-2"
                       >
                         Approve
                       </button>
                       <button
                         onClick={() => handleVerification(v._id, 'rejected')}
                         className="bg-red-500 text-white p-1 rounded"
                       >
                         Reject
                       </button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
         {/* User Management */}
         <div className="mb-10">
           <h3 className="text-2xl font-bold mb-4">User Management</h3>
           <div className="bg-white rounded shadow-md overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="bg-gray-200">
                   <th className="p-2 text-left">Name</th>
                   <th className="p-2 text-left">Email</th>
                   <th className="p-2 text-left">Role</th>
                   <th className="p-2 text-left">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {users.map(u => (
                   <tr key={u._id} className="border-t">
                     <td className="p-2">{u.name}</td>
                     <td className="p-2">{u.email}</td>
                     <td className="p-2">{u.role}</td>
                     <td className="p-2">
                       <button className="bg-yellow-500 text-white p-1 rounded mr-2">Suspend</button>
                       <button className="bg-red-500 text-white p-1 rounded">Delete</button>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
         {/* Prescription Overview */}
         <div>
           <h3 className="text-2xl font-bold mb-4">Prescription Overview</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
             <div className="p-4 bg-white rounded shadow-md">
               <h4 className="text-lg font-bold">Total Prescriptions</h4>
               <p className="text-2xl">{prescriptions.length}</p>
             </div>
             <div className="p-4 bg-white rounded shadow-md">
               <h4 className="text-lg font-bold">Active</h4>
               <p className="text-2xl">{prescriptions.filter(p => p.currentUses < p.maxUses).length}</p>
             </div>
             <div className="p-4 bg-white rounded shadow-md">
               <h4 className="text-lg font-bold">Expired</h4>
               <p className="text-2xl">{prescriptions.filter(p => new Date() > new Date(p.expiryDate)).length}</p>
             </div>
           </div>
           <div className="bg-white rounded shadow-md overflow-x-auto">
             <table className="w-full">
               <thead>
                 <tr className="bg-gray-200">
                   <th className="p-2 text-left">ID</th>
                   <th className="p-2 text-left">Doctor</th>
                   <th className="p-2 text-left">Patient</th>
                   <th className="p-2 text-left">Date</th>
                 </tr>
               </thead>
               <tbody>
                 {prescriptions.slice(0, 5).map(p => (
                   <tr key={p._id} className="border-t">
                     <td className="p-2">{p._id}</td>
                     <td className="p-2">{p.doctorId.name}</td>
                     <td className="p-2">{p.patientId.name}</td>
                     <td className="p-2">{new Date(p.createdAt).toLocaleDateString()}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
       </div>
     );
   };

   export default AdminDashboard;