const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      default: '',
      trim: true,
    },
    text: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'archived', 'deleted'],
      default: 'active',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Note', noteSchema);
