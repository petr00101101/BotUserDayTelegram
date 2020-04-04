import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    type: String,
  },
  userName: {
    type: String,
  },
  id: {
    required: true,
    type: String,
  },
  chatId: {
    required: true,
    type: String,
  },
});

export const User = mongoose.model('user', UserSchema);
