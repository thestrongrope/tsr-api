import userService from './userService.js';
import { logger } from '../../common/middleware/errorHandler.js';

export const getUsers = async (request, reply) => {
  try {
    const users = await userService.getAllUsers();
    reply.send(users);
  } catch (error) {
    logger.error(error.message);
    reply.status(500).send({ message: "Internal Server Error" });
  }
};
