import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  winner: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  chatId: {
    type: String,
    required: true,
  },
});

export const Game = mongoose.model('game', GameSchema);
