import Telegraf from 'telegraf';
import Telegram from 'telegraf/telegram.js';

import { getKeyboard, KEYBOARD_ACTIONS } from './keyboard.mjs';
import { createUser, getUsers, getUser } from '../user/user.repo.mjs';
import { getFormattedUserNames } from '../helpers/getFormattedUserNames.mjs';

const REPLY_MESSAGES = {
  GREETINGS: 'Здарова',
  ALREADY_REGISTERED: 'Не наебёшь - не проживешь. Ты уже регистрировался!',
  NEWLY_REGISTERED: 'Теперь ты в деле!',
  NOT_REGISTERED: 'Пока ты базаришь - другие делают. Зарегистрируйся сначала!',
  NO_MEMBERS: 'Нет игроков!',
  MEMBERS_LIST: 'Посоны с яйцами:',
  GAME: [
    'Красная книга изучена! 🏮',
    'Перепись в зоопарках проведена! 🦍🖋️📕',
    'Царь зверей постановил! 🦁',
    'Ебаное животное определено:',
  ],
};

async function wasUserRegisteredBefore(id, chatId) {
  const user = await getUser({ id, chatId });
  return !!user;
}

export function runBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN);
  const telegram = new Telegram(process.env.BOT_TOKEN);

  // Start message
  bot.start(({ reply }) => {
    return reply(REPLY_MESSAGES.GREETINGS, getKeyboard());
  });

  // Commands handler
  bot.use(async (ctx) => {
    const { from, chat } = ctx.message;

    switch (ctx.message.text) {
      case KEYBOARD_ACTIONS.REGISTRATION: {
        if (wasUserRegisteredBefore(from.id, chat.id)) {
          return ctx.reply(REPLY_MESSAGES.ALREADY_REGISTERED);
        }

        await createUser({
          firstName: from.first_name,
          lastName: from.last_name,
          userName: from.username,
          id: from.id,
          chatId: chat.id,
        });
        return ctx.reply(REPLY_MESSAGES.NEWLY_REGISTERED);
      }
      case KEYBOARD_ACTIONS.MEMBERS: {
        if (!wasUserRegisteredBefore(from.id, chat.id)) {
          return ctx.reply(REPLY_MESSAGES.NOT_REGISTERED);
        }

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
      case KEYBOARD_ACTIONS.PLAY: {
        if (!wasUserRegisteredBefore(from.id, chat.id)) {
          return ctx.reply(REPLY_MESSAGES.NOT_REGISTERED);
        }

        const users = await getUsers({ chatId: chat.id });
        if (!users.length) {
          return ctx.reply(REPLY_MESSAGES.NO_MEMBERS);
        }
        const random = Math.floor(Math.random() * users.length);
        const animal = getFormattedUserNames(users)[random];

        for (const message of REPLY_MESSAGES.GAME) {
          await ctx.reply(message);
        }

        return ctx.reply(`\n${animal}`).then(({ message_id }) => {
          telegram
            .pinChatMessage(users[random].chatId, message_id)
            .catch((error) => console.log(error.description));
        });
      }
      default: {
        break;
      }
    }
  });

  bot.launch();

  console.log(`${process.env.BOT_NAME} started`);
}
