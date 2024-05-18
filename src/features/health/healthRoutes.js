const healthRoutes = async (app, opts) => {
  app.get('/health', async (request, reply) => {
    reply.send({ status: 'ok' });
  });
};

export default healthRoutes;
