import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
});

export const Chat = mongoose.model('chat', ChatSchema);
