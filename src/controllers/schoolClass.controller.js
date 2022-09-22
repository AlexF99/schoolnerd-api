const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { SchoolClass } = require('../models');

const createClass = catchAsync(async (req, res) => {
  const entity = new SchoolClass(req.body);
  // entity.user = req.user._id;
  const saved = await entity.save();

  res.status(httpStatus.CREATED);
  res.json(saved);
});

const getClasses = catchAsync(async (req, res) => {
  const entities = await SchoolClass.find();

  if (!entities) {
    res.status(httpStatus.NOT_FOUND);
    res.json('Not found.');
  }

  res.status(httpStatus.OK);
  res.json(entities);
});

module.exports = {
  createClass,
  getClasses,
};
