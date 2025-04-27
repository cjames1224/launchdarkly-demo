require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const FirebaseClient = require('./services/firebase')
const LaunchDarkly = require('@launchdarkly/node-server-sdk');

const PORT = process.env.port || 3000;

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

// set up routes for crud metrics and auth
app.use('/api/metrics', require('./routes/metrics'));
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, ()=> {
  console.log( `Listening on port ${PORT}`)
});