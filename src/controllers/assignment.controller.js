const { omit } = require('lodash');
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

const update = catchAsync(async (req, res) => {
  const entity = new Assignment(req.body);
  const newEntity = omit(entity.toObject(), '_id', '__v');
  const oldEntity = await Assignment.findById(req.params.id);

  if (!oldEntity) {
    res.status(httpStatus.NOT_FOUND);
    res.json('Not found.');
  }

  await oldEntity.updateOne(newEntity, { override: true, upsert: true });
  entity.updatedBy = req.user._id;
  const savedEntity = await Assignment.findById(req.params.id);

  res.status(httpStatus.OK);
  res.json(savedEntity);
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
  update,
};
