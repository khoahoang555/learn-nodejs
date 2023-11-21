const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours_simple.json`, { encoding: 'utf-8', flag: 'r' }));

exports.checkID = (req, resp, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > tours.length) {
    return resp.status(404).json({
      status: 'fail', message: 'Invalid ID'
    });
  }
  next();
}

exports.checkBody = (req, resp, next) => {
  const {name, price} = req.body;
  if (!name || !price) {
    return resp.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
}

exports.getAllTours = (req, resp) => {
  resp.status(200).json({
    status: 'success', results: tours.length, data: {
      tours
    }
  });
};

exports.getTour = (req, resp) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  resp.status(200).json({
    status: 'success', data: {
      tour
    }
  });
};

exports.createTour = (req, resp) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  resp.status(201).json({
    status: 'success', data: {
      tour: newTour
    }
  });
};

exports.updateTour = (req, resp) => {
  resp.status(200).json({
    status: 'success', data: {
      tour: 'Updated tour here...'
    }
  });
};

exports.deleteTour = (req, resp) => {
  resp.status(204).json({
    status: 'success', data: null
  });
};
