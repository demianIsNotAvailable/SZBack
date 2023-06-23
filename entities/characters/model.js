import mongoose from "mongoose";


export const Character = mongoose.model('Character',new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30
  },
  description: {
    type: String,
    maxlength: 200
  },
  faction: {
    type: String,
    enum: ["WRG", "Resistencia", "ND", "Ninguna"]
  },
  player: {
    type: String,
    ref: 'User',
    required: true
  },
  events: [{
    type: String,
    ref: 'Edition',
  }],
  active: {
    type: Boolean,
    default: true,
    select: false
  }


},{ versionKey: false, timestamps: true }));


