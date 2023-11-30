const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

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
});

exports.getOne = (Model, popOptions) => catchAsync(async (req, resp, next) => {
  let query = Model.findById(req.params.id);
  if (popOptions) query = query.populate(popOptions);
  const doc = await query;

  if (!doc) {
    return next(new AppError('No doc found with that ID', 404));
  }

  resp.status(200).json({
    status: 'success',
    data: {
      tour: doc
    }
  });
});

exports.getAll = Model => catchAsync(async (req, resp, next) => {
  // To allow for nested GET reviews on tour
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId }

  // EXECUTE QUERY
  const features = new APIFeatures(Model.find(filter), req.query)
  .filter()
  .sort()
  .limitFields()
  .paginate();
  const docs = await features.query;

  // SEND RESPONSE
  resp.status(200).json({
    status: 'success',
    results: docs.length,
    data: {
      tours: docs
    }
  });
})