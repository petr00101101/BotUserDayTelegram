import { User } from './user.model.mjs';

export async function getUsers({ chatId }) {
  const users = await User.findByChatId({ chatId });
  return users;
}

export async function getUser({ id, chatId }) {
  const user = await User.findOneByIdAndChatId({ id, chatId });
  return user;
}

export async function createUser({
  firstName,
  lastName,
  userName,
  id,
  chatId,
}) {
  const user = new User();
  user.firstName = firstName;
  user.lastName = lastName;
  user.userName = userName;
  user.id = id;
  user.chat = chatId;
  await user.save();
  return user;
}
