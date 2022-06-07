const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted id' });
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

module.exports = {
  errorHandler
};