// logger.js
const winston = require('winston');
// Utility function to get the formatted date
const getFormattedDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
// Generate the date string
const dateStr = getFormattedDate();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: `logs/requests-${dateStr}.log`, level: 'info' }),
    new winston.transports.File({ 
        filename: `logs/error-${dateStr}.log`,
        level: 'error' 
      }),
  ],
});

// If we're not in production then log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
