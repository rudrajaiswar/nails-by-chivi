const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian phone number']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  service: {
    type: String,
    required: [true, 'Service selection is required'],
    enum: [
      'Bridal Makeup',
      'Party Look Makeup',
      'Traditional Look Makeup',
      'Hairstyle & Makeup',
      'Facial',
      'Cleanup',
      'Nail Art',
      'Mehendi / Henna',
      'Pre-Bridal Package',
      'Full Glam Package'
    ]
  },
  date: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  time: {
    type: String,
    required: [true, 'Appointment time is required']
  },
  venue: {
    type: String,
    enum: ['At Studio', 'Home Visit'],
    default: 'At Studio'
  },
  address: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
