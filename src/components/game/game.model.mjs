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

// eslint-disable-next-line func-names
GameSchema.statics.findOneByDateAndChatId = async function ({ date, chatId }) {
  const game = await this.findOne({ date })
    .populate('winner')
    .populate({
      path: 'chat',
      match: { id: chatId },
    });
  return game;
};

// eslint-disable-next-line func-names
GameSchema.statics.findByChatId = async function ({ chatId }) {
  const games = await this.find({})
    .populate('winner')
    .populate({
      path: 'chat',
      match: { id: chatId },
    });
  return games;
};

export const Game = mongoose.model('game', GameSchema);
