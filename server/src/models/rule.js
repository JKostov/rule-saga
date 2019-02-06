const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    category: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 50,
    },
    tags: [{
      type: String,
    }],
    company: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 2,
          maxlength: 50
        },
      }),
      ref: 'Company'
    },
    data: {
      type: mongoose.Schema.Types.Mixed
    },
  },
  {
    timestamps: true,
    minimize: false,
  },
);

module.exports = mongoose.model('Rule', schema);
