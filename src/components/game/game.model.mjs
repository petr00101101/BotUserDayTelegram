import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: String,
    required: true,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chat',
  },
});

export const Game = mongoose.model('game', GameSchema);
