const express = require('express');
const path = require('path');
const morgan = require('morgan');
  bodyParser = require('body-parser'),
  cors = require('cors');

const app = express();
var port = process.env.PORT || 3000;

// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// static file
app.use(express.static(path.join(__dirname, 'public')));

// start the server
var server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
