import Telegraf from 'telegraf';

import { getKeyboard } from './bot.keyboard.mjs';
import { REPLY_MESSAGES, KEYBOARD_COMMANDS } from './bot.constants.mjs';
import {
  registrationHandler,
  getGameMembersHandler,
  getGamesHandler,
  playGameHandler,
} from './bot.handlers.mjs';
import { userAuthentication } from './bot.middlewares.mjs';

export function runBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  // Start message with keyboard
  bot.start((ctx) => {
    return ctx.reply(REPLY_MESSAGES.GREETINGS, getKeyboard());
  });

  // Middlewares
  bot.use(userAuthentication);

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
        return playGameHandler(ctx, bot.telegram);
      }
      default: {
        break;
      }
    }
  });

  // Error handler
  bot.catch((err, ctx) => {
    console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
  });

  // Start bot
  bot.launch().then(() => console.log(`${process.env.BOT_NAME} started`));
}
