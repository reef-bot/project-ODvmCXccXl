logging.js

const winston = require('winston');
const moment = require('moment');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

const logError = (error) => {
  logger.error(`${moment().format('YYYY-MM-DD HH:mm:ss')} - ${error.message}`);
};

const logInfo = (message) => {
  logger.info(`${moment().format('YYYY-MM-DD HH:mm:ss')} - ${message}`);
};

module.exports = {
  logError,
  logInfo
};