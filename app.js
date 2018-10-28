if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser:true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Express server running on port', PORT);
});
