import Markup from 'telegraf/markup.js';
import { KEYBOARD_COMMANDS } from './bot.constants.mjs';

export function getKeyboard() {
  return Markup.keyboard([
    [KEYBOARD_COMMANDS.PLAY],
    [KEYBOARD_COMMANDS.GAMES, KEYBOARD_COMMANDS.GAME_MEMBERS],
    [KEYBOARD_COMMANDS.REGISTRATION],
  ])
    .oneTime()
    .resize()
    .extra();
}
