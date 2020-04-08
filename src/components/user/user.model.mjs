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

export const User = mongoose.model('user', UserSchema);
