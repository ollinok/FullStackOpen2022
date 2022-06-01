const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./utils/errorHandler').errorHandler;
const mongoose = require('mongoose');

const blogsRouter = require('./controllers/blogs');

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to the database.');
  }).catch(err => {
    logger.error(err);
  });

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use(errorHandler);

module.exports = app;