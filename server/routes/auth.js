const express = require('express');
const router = express.Router();

router.get('/callback', (req, res) => {
  res.send('GET request to the oauth callback');
});

router.get('/launch', (req, res) => {
  res.send('POST request to the launch auth');
});

module.exports = router;