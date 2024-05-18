import fastifySwagger from '@fastify/swagger';

export default function setupSwagger(app) {
  console.log('Registering Swagger plugin');
  app.register(fastifySwagger, {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Fastify API',
        description: 'API documentation',
        version: '1.0.0',
      },
      host: 'localhost:3000', // Update this to match your server configuration
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true,
  });
}
