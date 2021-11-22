const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Некорректно введен email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 8,
    validate: {
      validator(v) {
        return validator.isStrongPassword(v);
      },
      message: 'Пароль слишком простой',
    },
  },
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта и пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта и пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
