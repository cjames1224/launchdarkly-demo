const express = require('express');
const router = express.Router();
const FirebaseClient = require('../services/firebase')

// route - retrieve data for account by id
router.get('/:id', async (req, res) => {
  const dataResult = await FirebaseClient.instance().readData(req.params.id);

  res.send({
    result: dataResult
  })
});

// route - write data for account by id
router.post('/:id', async (req, res) => {
  const dataResult = await FirebaseClient.instance().writeData(req.params.id, req.body);

  res.send({
    result: dataResult
  })
});

module.exports = router;