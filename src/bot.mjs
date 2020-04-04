import Telegraf from 'telegraf';

export function runBot() {
  const bot = new Telegraf('1216019956:AAHeETzmnZ5aS-_aeu3CLa00BT1gXCZFNVY');

  // display Welcome text when we start bot
  bot.start((ctx) => ctx.reply('Welcome'));

  // listen and handle when user type hi text
  bot.hears('hi', (ctx) => ctx.reply('Hey there'));

  bot.launch();
}
