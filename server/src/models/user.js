const mongoose = require('mongoose');
const validateEmail = require('../util/validateEmail');

const STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    company: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 50
        },
      }),
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(STATUSES),
    },
    registerToken: {
      type: String,
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

module.exports = mongoose.model('User', schema);
module.exports.STATUSES = STATUSES;
module.exports.STATUSES_ARRAY = Object.values(STATUSES);
