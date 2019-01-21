const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

module.exports = mongoose.model('PasswordRecovery', schema);
