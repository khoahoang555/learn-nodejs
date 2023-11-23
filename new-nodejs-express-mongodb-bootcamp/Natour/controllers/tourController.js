const fs = require('fs');
const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopTours = (req, resp, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,ratingAverage,summary,difficulty';
  next();
}

exports.getAllTours = async (req, resp) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // SEND RESPONSE
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

exports.getTourStats = async (req, resp) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      },
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);
    resp.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (err) {
    resp.status(404).json({
      status: 'fail',
      message: err
    });
  }
}

exports.getMonthlyPlan = async (req, resp) => {
  try {
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '$_id' }
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: {
          numTourStarts: -1
        }
      },
      {
        $limit: 12
      }
    ]);

    resp.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (err) {
    resp.status(404).json({
      status: 'fail',
      message: err
    });
  }
}