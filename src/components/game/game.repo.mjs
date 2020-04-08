import { Game } from './game.model.mjs';
import { getFormattedDate } from '../../helpers/getFormattedDate.mjs';

export async function getChatGames({ chatId }) {
  const games = await Game.findByChatId({ chatId });
  return games;
}

export async function getGame({ date, chatId }) {
  const game = await Game.findOneByDateAndChatId({ date, chatId });
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
