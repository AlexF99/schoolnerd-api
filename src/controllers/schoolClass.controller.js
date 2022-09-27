const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { SchoolClass } = require('../models');

const create = catchAsync(async (req, res) => {
  const entity = new SchoolClass(req.body);
  entity.user = req.user._id;
  const saved = await entity.save();

  res.status(httpStatus.CREATED);
  res.json(saved);
});

const get = catchAsync(async (req, res) => {
  const entities = await SchoolClass.findOne({ _id: req.params.id });

  if (!entities) {
    res.status(httpStatus.NOT_FOUND);
    res.json('Not found.');
  }

  res.status(httpStatus.OK);
  res.json(entities);
});

const list = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const entities = await SchoolClass.find({ user: userId });

  if (!entities) {
    res.status(httpStatus.NOT_FOUND);
    res.json('Not found.');
  }

  res.status(httpStatus.OK);
  res.json(entities);
});

module.exports = {
  create,
  get,
  list,
};
