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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventType',
    required: true
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}));