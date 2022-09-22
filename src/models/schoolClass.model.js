const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const schoolClassSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    minGrade: {
      type: Number,
      required: true,
      index: true,
    },
    grade: {
      type: Number,
      required: true,
      index: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
schoolClassSchema.plugin(toJSON);

/**
 * @typedef SchoolClass
 */
const SchoolClass = mongoose.model('SchoolClass', schoolClassSchema);

module.exports = SchoolClass;
