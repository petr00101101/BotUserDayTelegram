import Markup from 'telegraf/markup.js';

export const KEYBOARD_ACTIONS = {
  REGISTRATION: '🦦 Регистрация',
  MEMBERS: '📋 Список ровных ребят',
  GAMES: '📋 Список игр',
  PLAY: '🤞 Вычислить ебаное животное',
};

export function getKeyboard() {
  return Markup.keyboard([
    [KEYBOARD_ACTIONS.PLAY],
    [KEYBOARD_ACTIONS.GAMES, KEYBOARD_ACTIONS.MEMBERS],
    [KEYBOARD_ACTIONS.REGISTRATION],
  ])
    .oneTime()
    .resize()
    .extra();
}
