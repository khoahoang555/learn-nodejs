const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Tour = require('../models/tourModel');

exports.deleteOne = Model => catchAsync(async (req, resp, next) => {
  const doc = await Model.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  resp.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateOne = Model => catchAsync(async (req, resp, next) => {
  const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  resp.status(200).json({
    status: 'success', data: {
      tour: doc
    }
  });
});

exports.createOne = Model => catchAsync(async (req, resp, next) => {
  const newDoc = await Model.create(req.body);
  resp.status(201).json({
    status: 'success',
    data: {
      data: newDoc
    }
  });
})