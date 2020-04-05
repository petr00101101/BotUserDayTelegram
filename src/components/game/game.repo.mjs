import { Game } from './game.model.mjs';

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
  game.date = new Date();
  await game.save();
  return game;
}
