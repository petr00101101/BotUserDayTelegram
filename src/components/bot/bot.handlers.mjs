import { REPLY_MESSAGES } from './bot.constants.mjs';
import { createUser, getUsers } from '../user/user.repo.mjs';
import { createGame, getGames } from '../game/game.repo.mjs';
import { getFormattedUserNames } from '../../helpers/getFormattedUserNames.mjs';
import { getFormattedGames } from '../../helpers/getFormattedGames.mjs';

export async function registrationHandler(ctx) {
  const { from, chat } = ctx.message;

  await createUser({
    firstName: from.first_name,
    lastName: from.last_name,
    userName: from.username,
    id: from.id,
    chatId: chat.id,
  });

  return ctx.reply(REPLY_MESSAGES.NEWLY_REGISTERED);
}

export async function getGameMembersHandler(ctx) {
  const { chat } = ctx.message;

  const users = await getUsers({ chatId: chat.id });
  if (!users.length) {
    return ctx.reply(REPLY_MESSAGES.NO_MEMBERS);
  }

  const members = getFormattedUserNames(users)
    .map((userName, index) => {
      return `\n${index + 1}) ${userName}`;
    })
    .join('');

  return ctx.reply(`${REPLY_MESSAGES.MEMBERS_LIST}:\n${members}`);
}

export async function getGamesHandler(ctx) {
  const { chat } = ctx.message;

  const games = await getGames({ chatId: chat.id });
  if (!games.length) {
    return ctx.reply(REPLY_MESSAGES.NO_GAMES);
  }

  const response = getFormattedGames(games)
    .map((game, index) => {
      return `\n${index + 1}) ${game}`;
    })
    .join('');

  return ctx.reply(response);
}

export async function playGameHandler(ctx, telegram) {
  const { chat } = ctx.message;

  const users = await getUsers({ chatId: chat.id });
  if (!users.length) {
    return ctx.reply(REPLY_MESSAGES.NO_MEMBERS);
  }

  const random = Math.floor(Math.random() * users.length);
  const animal = getFormattedUserNames(users)[random];

  await createGame({ chatId: chat.id, winner: animal });

  for (const message of REPLY_MESSAGES.GAME) {
    await ctx.reply(message);
  }

  return ctx.reply(`\n${animal}`).then(({ message_id }) => {
    telegram
      .pinChatMessage(users[random].chatId, message_id)
      .catch((error) => console.log(error.description));
  });
}
