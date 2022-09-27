const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const assignmentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    grade: {
      type: Number,
      required: false,
      index: true,
    },
    date: {
      type: Date,
      required: false,
      index: true,
    },
    schoolClass: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'SchoolClass',
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
assignmentSchema.plugin(toJSON);

/**
 * @typedef Assignment
 */
const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
