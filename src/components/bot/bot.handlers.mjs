import { REPLY_MESSAGES } from './bot.constants.mjs';
import { createUser, getUsers } from '../user/user.repo.mjs';
import { createGame, getGames, getGame } from '../game/game.repo.mjs';
import { createChat, getChat } from '../chat/chat.repo.mjs';
import { getFormattedDate } from '../../helpers/getFormattedDate.mjs';

export async function registrationHandler(ctx) {
  const { from, chat } = ctx.message;

  let dbChat = await getChat({ id: chat.id });
  if (!dbChat) {
    dbChat = await createChat({ id: chat.id });
  }

  await createUser({
    firstName: from.first_name,
    lastName: from.last_name,
    userName: from.username,
    id: from.id,
    chatId: dbChat._id,
  });

  return ctx.reply(REPLY_MESSAGES.NEWLY_REGISTERED);
}

export async function getGameMembersHandler(ctx) {
  const { chat } = ctx.message;

  const users = await getUsers({ chatId: chat.id });
  if (!users.length) {
    return ctx.reply(REPLY_MESSAGES.NO_MEMBERS);
  }

  const members = users
    .map((user, index) => {
      return `\n${index + 1}) ${user.fullName}`;
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

  const response = games
    .map((game, index) => {
      return `\n${index + 1}) ${game.date} - ${game.winner.fullName}`;
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

  const game = await getGame({ chatId: chat.id, date: getFormattedDate() });
  console.log(game);
  if (game) {
    return ctx.reply(`${REPLY_MESSAGES.DAY_WINNER} ${game.winner.fullName}`);
  }

  // TODO: Move game logic
  const random = Math.floor(Math.random() * users.length);
  const animal = users[random];

  await createGame({
    chatId: await getChat({ id: chat.id })._id,
    userId: animal._id,
  });

  for (const message of REPLY_MESSAGES.GAME) {
    await ctx.reply(message);
  }

  return ctx.reply(`\n${animal.fullName}`).then(({ message_id }) => {
    telegram
      .pinChatMessage(animal.chat.id, message_id)
      .catch((error) => console.log(error.description));
  });
}
