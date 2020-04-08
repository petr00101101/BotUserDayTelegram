import { Game } from './game.model.mjs';
import { getFormattedDate } from '../../helpers/getFormattedDate.mjs';

export async function getGames({ chatId }) {
  const games = await Game.find()
    .populate('winner')
    .populate({
      path: 'chat',
      match: { id: chatId },
    });
  return games;
}

export async function getGame({ date, chatId }) {
  const game = await Game.findOne({ date })
    .populate('winner')
    .populate({
      path: 'chat',
      match: { id: chatId },
    });
  return game;
}

export async function createGame({ userId, chatId }) {
  const game = new Game();
  game.winner = userId;
  game.chat = chatId;
  game.date = getFormattedDate();
  await game.save();
  return game;
}
