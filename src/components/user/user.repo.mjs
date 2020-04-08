import { User } from './user.model.mjs';

export async function getUsers({ chatId }) {
  const users = await User.find({}).populate({
    path: 'chat',
    match: { id: chatId },
  });
  return users;
}

export async function getUser({ id, chatId }) {
  const user = await User.findOne({ id }).populate({
    path: 'chat',
    match: { id: chatId },
  });
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
