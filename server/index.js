require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const PORT = process.env.port || 3000;

app.use(cors())
app.use(morgan('tiny'))

app.get('/api/home', (req, res) => {
  res.json({
    message: 'This is a different API Response',
    people: ["Chris", "James", "Spencer"]
  })
});

app.listen(PORT, ()=> {
  console.log( `Listening on port ${PORT}`)
});