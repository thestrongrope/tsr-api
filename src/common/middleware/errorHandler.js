import winston from "winston";
import dotenv from 'dotenv';

dotenv.config();

// Create a Winston logger
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log" }),
  ],
});

const errorHandler = (error, request, reply) => {
  // Log the error using Winston
  logger.error(error.message);

  // Send error response
  reply.status(error.statusCode || 500).send({
    error: {
      message: 
        ((process.env.NODE_ENV === "development") 
          ? error.message : false) || "Internal Server Error",
    },
  });
};

export {
  errorHandler,
  logger,
};
