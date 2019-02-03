const express = require('express');
const router = express.Router();
const stopsController = require('../controllers/stops');

router.get('/', (req, res) => {
  res.send('welcome The Star Wars API');
});

router.get('/stops/:mglt', stopsController.getStops);

module.exports = router;