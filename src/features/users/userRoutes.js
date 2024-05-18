import { getUsers } from './userHandler.js';

const userRoutes = async (fastify) => {
  fastify.get('/users', getUsers);
};

export default userRoutes;
