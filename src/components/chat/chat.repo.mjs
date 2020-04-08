import { Chat } from './chat.model.mjs';

export async function getChats({ id }) {
  const chats = await Chat.find({ id });
  return chats;
}

export async function getChat({ id }) {
  const chats = await Chat.findOne({ id });
  return chats;
}

export async function createChat({ id }) {
  const chat = new Chat();
  chat.id = id;
  await chat.save();
  return chat;
}
