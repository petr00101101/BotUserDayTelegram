import { User } from './user.model.mjs';

export async function getUsers({ chatId }) {
  const users = await User.find({ chatId });
  return users;
}

export async function getUser({ id, chatId }) {
  const user = await User.findOne({ id, chatId });
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
  user.chatId = chatId;
  await user.save();
  return user;
}
