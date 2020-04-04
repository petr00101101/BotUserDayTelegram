import Telegraf from 'telegraf';

import { getKeyboard, KEYBOARD_ACTIONS } from './keyboard.mjs';

export function runBot() {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  // Start message
  bot.start(({ reply }) => {
    return reply('Здарова', getKeyboard());
  });

  // Commands handler
  bot.use((ctx) => {
    switch (ctx.message.text) {
      case KEYBOARD_ACTIONS.REGISTRATION: {
        return ctx.reply('Ты в деле');
      }
      case KEYBOARD_ACTIONS.LEAVE: {
        return ctx.reply('Ссыкло');
      }
      case KEYBOARD_ACTIONS.RUN: {
        return ctx.reply('Ну, погнали');
      }
      case KEYBOARD_ACTIONS.STATS: {
        return ctx.reply('Стата подъехала');
      }
      default: {
        break;
      }
    }
  });

  bot.launch();

  console.log(`${process.env.BOT_NAME} started`);
}
