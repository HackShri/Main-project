const mongoose = require('mongoose');

   const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     role: { type: String, enum: ['doctor', 'patient', 'shop', 'admin'], required: true },
     age: { type: Number, required: function() { return this.role === 'patient'; } },
     weight: { type: Number, required: function() { return this.role === 'patient'; } },
     height: { type: Number, required: function() { return this.role === 'patient'; } },
     createdAt: { type: Date, default: Date.now },
   });

   module.exports = mongoose.model('User', userSchema);