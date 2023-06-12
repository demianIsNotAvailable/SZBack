import mongoose from 'mongoose';

export const User = mongoose.model('User', new mongoose.Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
  },
  city: {
    type: String
  },
  province: {
    type: String
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: '648706ff52eef9a93a69750a'
  },
  verified: {
    type: Boolean,
    default: false
  },
  active: {
    type: Boolean,
    default: true,
  },
  dateOfCreation: {
    type: Date,
    required: true,
    default: Date.now
  }
}));


