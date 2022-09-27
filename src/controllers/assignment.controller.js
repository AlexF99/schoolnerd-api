const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { Assignment } = require('../models');

const create = catchAsync(async (req, res) => {
  const entity = new Assignment(req.body);
  entity.user = req.user._id;
  const saved = await entity.save();

  res.status(httpStatus.CREATED);
  res.json(saved);
});

const list = catchAsync(async (req, res) => {
  const query = req.query || {};
  const entities = await Assignment.find(query);

  if (!entities) {
    res.status(httpStatus.NOT_FOUND);
    res.json('Not found.');
  }

  res.status(httpStatus.OK);
  res.json(entities);
});

module.exports = {
  create,
  list,
};
