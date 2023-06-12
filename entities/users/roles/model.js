import mongoose from "mongoose";



export const Role = mongoose.model('Role', new mongoose.Schema({
  role: {
    type: String,
    enum: ['GUEST', 'USER', 'VIP', 'MOD', 'ADMIN', 'SUPERADMIN'],
    required: true,
    unique: true
  }
}));


