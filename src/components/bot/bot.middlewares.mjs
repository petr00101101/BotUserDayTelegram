import { REPLY_MESSAGES, KEYBOARD_COMMANDS } from './bot.constants.mjs';
import { getUser } from '../user/user.repo.mjs';

export async function withAuthentication(ctx, next) {
  const PUBLIC_ACTIONS = [KEYBOARD_COMMANDS.REGISTRATION];

  const { message } = ctx;
  const { text, from, chat } = message;

  const user = await getUser({ id: from.id, chatId: chat.id });
  if (
    !user &&
    Object.values(KEYBOARD_COMMANDS).includes(text) &&
    !PUBLIC_ACTIONS.includes(text)
  ) {
    return ctx.reply(REPLY_MESSAGES.NOT_REGISTERED);
  }
  if (user && text === KEYBOARD_COMMANDS.REGISTRATION) {
    return ctx.reply(REPLY_MESSAGES.ALREADY_REGISTERED);
  }

  await next();
}
