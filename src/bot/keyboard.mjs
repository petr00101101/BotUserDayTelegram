import Markup from 'telegraf/markup.js';

export const KEYBOARD_ACTIONS = {
  REGISTRATION: '🦦 Регистрация',
  MEMBERS: '📋 Список ровных ребят',
  PLAY: '🤞 Вычислить ебаное животное',
};

export function getKeyboard() {
  return Markup.keyboard([
    [KEYBOARD_ACTIONS.PLAY],
    [KEYBOARD_ACTIONS.REGISTRATION, KEYBOARD_ACTIONS.MEMBERS],
  ])
    .oneTime()
    .resize()
    .extra();
}
