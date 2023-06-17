import mongoose from "mongoose";

export const Edition = mongoose.model('Edition', new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  timeOfDay: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    enum: ['SZ', '48h', 'Rojo', 'La Purga', 'Cazadores de Demonios', 'Juegos del Calamar', 'Otros'],
    required: true
  },
  users: [{
    type: String,
    ref: 'User'
  }]
}));