const mongoose = require('mongoose');
const validateEmail = require('../util/validateEmail');

const STATUSES = {
  PENDING: 'pending',
  COMPLETED: 'completed',
};

const schema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    userEmail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      validate: [validateEmail, 'Please fill a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    invitationToken: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(STATUSES),
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

module.exports = mongoose.model('CompanyInvitation', schema);
module.exports.STATUSES = STATUSES;
module.exports.STATUSES_ARRAY = Object.values(STATUSES);
