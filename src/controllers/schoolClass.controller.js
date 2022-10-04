const { omit } = require('lodash');
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
  const entity = await SchoolClass.findOne({ _id: req.params.id });

  if (!entity) {
    res.status(httpStatus.NOT_FOUND);
    res.json('Not found.');
  }

  res.status(httpStatus.OK);
  res.json(entity);
});

const update = catchAsync(async (req, res) => {
  const entity = new SchoolClass(req.body);
  const newEntity = omit(entity.toObject(), '_id', '__v');
  const oldEntity = await SchoolClass.findById(req.params.id);

  if (!oldEntity) {
    res.status(httpStatus.NOT_FOUND);
    res.json('Not found.');
  }

  await oldEntity.updateOne(newEntity, { override: true, upsert: true });
  entity.updatedBy = req.user._id;
  const savedEntity = await SchoolClass.findById(req.params.id);

  res.status(httpStatus.OK);
  res.json(savedEntity);
});

const remove = catchAsync(async (req, res) => {
  const entity = await SchoolClass.findById(req.params.id);

  if (!entity) {
    res.status(httpStatus.NOT_FOUND);
  }

  await entity.remove();

  // TODO: remove all assignments with this class' id

  res.status(httpStatus.NO_CONTENT);
  res.end();
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
  update,
  remove,
  get,
  list,
};
