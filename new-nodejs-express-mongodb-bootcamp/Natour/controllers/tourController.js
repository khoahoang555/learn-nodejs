const fs = require('fs');

const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours_simple.json`)
  fs.readFileSync(`${__dirname}/../dev-data/data/tours_simple.json`)
);

exports.getAllTours = (req, resp) => {
  resp.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, resp) => {
  console.log(req.params);
  const id = req.params.id * 1;

  if (id > tours.length) {
    return resp.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const tour = tours.find((el) => el.id === id);

  resp.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, resp) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours_simple.json`,
    JSON.stringify(tours),
    (err) => {
      resp.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, resp) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return resp.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  resp.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here...',
    },
  });
};

exports.deleteTour = (req, resp) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return resp.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  resp.status(204).json({
    status: 'success',
    data: null,
  });
};
