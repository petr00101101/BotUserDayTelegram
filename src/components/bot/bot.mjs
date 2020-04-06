import Telegraf from 'telegraf';
import Telegram from 'telegraf/telegram.js';

import { getKeyboard } from './bot.keyboard.mjs';
import { REPLY_MESSAGES, KEYBOARD_COMMANDS } from './bot.constants.mjs';
import {
  registrationHandler,
  getGameMembersHandler,
  getGamesHandler,
  playGameHandler,
} from './bot.handlers.mjs';
import { withAuthentication } from './bot.middlewares.mjs';

export function runBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN);
  const telegram = new Telegram(process.env.BOT_TOKEN);

  // Start message
  bot.start((ctx) => {
    return ctx.reply(REPLY_MESSAGES.GREETINGS, getKeyboard());
  });

  // Middlewares
  bot.use(withAuthentication);

  // Commands handler
  bot.use(async (ctx) => {
    switch (ctx.message.text) {
      case KEYBOARD_COMMANDS.REGISTRATION: {
        return registrationHandler(ctx);
      }
      case KEYBOARD_COMMANDS.GAME_MEMBERS: {
        return getGameMembersHandler(ctx);
      }
      case KEYBOARD_COMMANDS.GAMES: {
        return getGamesHandler(ctx);
      }
      case KEYBOARD_COMMANDS.PLAY: {
        return playGameHandler(ctx, telegram);
      }
      default: {
        break;
      }
    }
  });

  // Error handling
  bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
  });

  bot.launch().then(() => console.log(`${process.env.BOT_NAME} started`));
}
