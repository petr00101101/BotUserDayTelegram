import dotenv from 'dotenv';

import { checkEnv } from './helpers/checkEnv.mjs';
import { runBot } from './bot.mjs';

dotenv.config();

try {
  // Check process.env variables before starting the server
  checkEnv(['NAME', 'DB_URL', 'BOT_TOKEN']);

  // Run bot
  runBot();
} catch (error) {
  console.log(error.message);
}

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.log('Unhandled Promise Rejection:', error.message);
  process.exit(1);
});
