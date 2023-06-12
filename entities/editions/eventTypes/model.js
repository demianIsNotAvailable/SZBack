import mongoose from "mongoose";


export const Type = mongoose.model('Type', new mongoose.Schema({
  type: {
    type: String,
    enum: ['SZ', '48h', 'Rojo', 'La Purga', 'Cazadores de Demonios', 'Juegos del Calamar', 'Otros'],
    required: true,
    unique: true
  },
  description: {
    type: String
  }
}));


