import mongoose from "mongoose";

export const Edition = mongoose.model('Edition', new mongoose.Schema({
  location: {
    type: String,
    required: true,
      index: {
        collation: { locale: 'en', strength: 2 },
    }
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['SZ', '48h', 'Rojo', 'La Purga', 'Cazadores de Demonios', 'Juegos del Calamar', 'Otros'],
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  users: [{
    type: String,
    ref: 'User',
    select: false
  }]
}, { versionKey: false, timestamps: true }));