const fs = require('fs');
const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, resp) => {
  try {
    const tours = await Tour.find();

    resp.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    resp.status(404).json({
      status: 'fail',
      message: err
    });
  }

};

exports.getTour = async (req, resp) => {
  try {
    const tour = await Tour.findById(req.params.id);
    resp.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    resp.status(404).json({
      status: 'fail',
      message: err
    });
  }
};

exports.createTour = async (req, resp) => {
  try {
    const newTour = await Tour.create(req.body);
    resp.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    resp.status(400).json({
      status: 'fail',
      message: err
    });
  }
};

exports.updateTour = async (req, resp) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    resp.status(200).json({
      status: 'success', data: {
        tour
      }
    });
  } catch (err) {
    resp.status(400).json({
      status: 'fail',
      message: 'Invalid data send!'
    });
  }
};

exports.deleteTour = async (req, resp) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    resp.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    resp.status(400).json({
      status: 'fail',
      message: 'Invalid data send!'
    });
  }
};
