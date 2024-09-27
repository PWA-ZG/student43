const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');
const router = require('./routes/index.js');
const socketIO = require('socket.io');
const cameraRoute = require('./routes/camera');

dotenv.config();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/sw.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'sw.js'));
});

const port = process.env.PORT || 3000;
const config = {
  //baseURL: 'https://projekt1web2antonmacan.onrender.com',

};


if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}


// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  next();
});

app.use('/', router);
app.use('/camera', cameraRoute);

app.get('/cat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cat.jpg'));
});

const server = http.createServer(app)
  .listen(port, () => {
    console.log(`Listening on ${config.baseURL}`);
  });

  const io = socketIO(server);

