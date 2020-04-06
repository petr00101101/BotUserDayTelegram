import { Game } from './game.model.mjs';
import { getDate } from '../../helpers/getDate.mjs';

export async function getGames({ chatId }) {
  const games = await Game.find({ chatId });
  return games;
}

export async function getGame({ date, chatId }) {
  const game = await Game.findOne({ date, chatId });
  return game;
}

export async function createGame({ winner, chatId }) {
  const game = new Game();
  game.winner = winner;
  game.chatId = chatId;
  game.date = getDate();
  await game.save();
  return game;
}
