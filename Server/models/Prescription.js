const mongoose = require('mongoose');

   const prescriptionSchema = new mongoose.Schema({
     patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
     symptoms: [{ type: String, required: true }],
     medications: [{
       name: String,
       dosage: String,
       frequency: String,
       duratoion: String,
     }],
     instructions: { type: String },
     expiryDate: { type: Date, required: true },
     maxUses: { type: Number, required: true, default: 1 },
     currentUses: { type: Number, default: 0 },
     digitalSignature: { type: String, required: true },
     createdAt: { type: Date, default: Date.now },
    });
module.exports = mongoose.model('Prescription', prescriptionSchema);