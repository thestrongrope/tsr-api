import { getUsers } from './userHandler.js';

const userRoutes = async (fastify) => {
  fastify.get('/users', {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              email: { type: 'string' },
              age: { type: 'number' },
            },
          },
        },
      },
    }
  }, getUsers);
};

export default userRoutes;
