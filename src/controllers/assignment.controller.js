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

module.exports = {
  create,
};
