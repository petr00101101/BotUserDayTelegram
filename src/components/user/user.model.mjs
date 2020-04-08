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
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'chat',
  },
});

// eslint-disable-next-line func-names
UserSchema.virtual('fullName').get(function () {
  if (this.lastName) {
    return `${this.firstName} ${this.lastName}`;
  }
  if (this.userName) {
    return `${this.userName}`;
  }
  return `${this.firstName}`;
});

// eslint-disable-next-line func-names
UserSchema.statics.findOneByIdAndChatId = async function ({ id, chatId }) {
  const user = await this.findOne({ id }).populate({
    path: 'chat',
    match: { id: chatId },
  });
  return user;
};

// eslint-disable-next-line func-names
UserSchema.statics.findByChatId = async function ({ chatId }) {
  const users = await this.find({}).populate({
    path: 'chat',
    match: { id: chatId },
  });
  return users;
};

export const User = mongoose.model('user', UserSchema);
