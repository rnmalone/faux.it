import winston from 'winston';
const { combine, timestamp, printf } = winston.format;

const project = require('../../config/project.config')

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level.toUpperCase()}: ${message}`;
});

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.File({ filename: project.paths.logs('error.log'), level: 'error' }),
        new winston.transports.File({ filename: project.paths.logs('info.log'), level: 'info' }),
        new winston.transports.File({ filename: project.paths.logs('combined.log') }),
    ]
})

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: combine(
            timestamp(),
            myFormat
        ),
    }));
}

export default logger;