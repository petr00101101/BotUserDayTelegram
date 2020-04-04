import Markup from 'telegraf/markup.js';

export const KEYBOARD_ACTIONS = {
  REGISTRATION: '🦦 Registration',
  LEAVE: '💩 Leave',
  STATS: '📋 Show Stats',
  RUN: '🏃🏾 Run',
};

export function getKeyboard() {
  return Markup.keyboard([
    [KEYBOARD_ACTIONS.RUN, KEYBOARD_ACTIONS.STATS],
    [KEYBOARD_ACTIONS.REGISTRATION, KEYBOARD_ACTIONS.LEAVE],
  ])
    .oneTime()
    .resize()
    .extra();
}
