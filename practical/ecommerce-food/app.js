const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));

const whitelist = [process.env.CORS_ALLOWED_ORIGINS];
const corsOption = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOption));

// Routes
app.use('/api', userRouter);

module.exports = app;
