import mongoose from "mongoose";


export const Character = mongoose.model('Character',new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 30
  },
  description: {
    type: String,
    maxlength: 500
  },
  faction: {
    type: String,
    enum: ["WRG", "Resistencia", "ND", "Ninguna"]
  },
  player: {
    type: String,
    ref: 'User',
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  }


},{ versionKey: false, timestamps: true }));


