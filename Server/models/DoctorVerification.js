const mongoose = require('mongoose');

   const verificationSchema = new mongoose.Schema({
     doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     licenseNumber: { type: String, required: true },
     documentUrl: { type: String, required: true }, // URL to uploaded document
     status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
     createdAt: { type: Date, default: Date.now },
   });

   module.exports = mongoose.model('DoctorVerification', verificationSchema);