const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.login);

router.post('/register', (req, resp) => {
  resp.json({
    text: 'This is test',
  });
});

router.post('/forgot-password', (req, resp) => {
  resp.json({
    text: 'This is test',
  });
});

module.exports = router;
