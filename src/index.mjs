import dotenv from 'dotenv';

import { checkEnv } from './helpers/checkEnv.mjs';
import { runBot } from './bot/bot.mjs';
import { connectToDatabase } from './config/database.mjs';

dotenv.config();

(async () => {
  try {
    // Check process.env variables before starting the server
    checkEnv(['BOT_NAME', 'BOT_TOKEN', 'NODE_ENV', 'DB_URL']);

    // Connect to database
    await connectToDatabase();

    // Run bot
    runBot();
  } catch (error) {
    console.log(error.message);
  }
})();

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.log('Unhandled Promise Rejection:', error.message);
  process.exit(1);
});
