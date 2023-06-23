import mongoose from 'mongoose';

export const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  birthdate: {
    type: Date,
  },
  city: {
    type: String
  },
  province: {
    type: String
  },
  role: {
    type: String,
    enum: ["GUEST", "USER", "VIP", "MOD", "ADMIN", "SUPERADMIN"],
    default: 'GUEST'
  },
  verified: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true,
  },
  events: [{
    type: String,
    ref: 'Edition',
    select: false
  }]

}, { versionKey: false, timestamps: true }));


