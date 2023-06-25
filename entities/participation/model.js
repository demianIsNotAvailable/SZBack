import mongoose from "mongoose";

const ParticipationSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    maxlength: 15
  },
  character: {
    type: String,
    ref: "Character",
    required: true
  },
  edition: {
    type: String,
    ref: 'Edition',
    required: true,
  },
  log: {
    type: String,
    maxlength: 300,
  },
  active: {
    type: Boolean,
    default: true
  }

},{ versionKey: false, timestamps: true });

ParticipationSchema.index({ character: 1, edition: 1 }, { unique: true });
export const Participation = mongoose.model('Participation', ParticipationSchema);