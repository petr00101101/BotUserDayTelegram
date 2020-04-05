import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  winner: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  chatId: {
    type: String,
    required: true,
  },
});

export const Game = mongoose.model('game', GameSchema);
