const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'Invalid first name.'],
  },
  last_name: {
    type: String,
    required: [true, 'Invalid last name.'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Invalid Email Address'],
  },
  displayPhoto: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Invalid password'],
  },
  passwordConfirm: {
    type: String,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcryptjs.hash(this.password, 8);
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
