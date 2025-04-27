const express = require('express');
const router = express.Router();

// NOTE: These routes are not used, instead we use Clerk on the FE to login/signup
router.get('/callback', (req, res) => {
  res.send('GET request to the oauth callback');
});

router.get('/launch', (req, res) => {
  res.send('POST request to the launch auth');
});

module.exports = router;
