import Fastify from 'fastify';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import swagger from './swagger/swaggerConfig.js';
import userRoutes from './features/users/userRoutes.js';
import healthRoutes from './features/health/healthRoutes.js';
import { errorHandler } from './common/middleware/errorHandler.js';
import authenticate from './common/middleware/auth.js';
import fastifyStatic from '@fastify/static';

dotenv.config();

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = Fastify({ logger: true });

// Register Swagger
swagger(app);

// Register middleware
app.addHook('onRequest', async (request, reply) => {
  const allowedRoutes = ['/api/login', '/api/health', '/documentation', '/login'];
  if(!allowedRoutes.includes(request.url)) {
    await authenticate(request, reply, () => {});
  }
});

// Register routes
app.register(userRoutes, { prefix: '/api' });
app.register(healthRoutes, { prefix: '/api' });

// Serve static files only in development mode
if (process.env.NODE_ENV === 'development') {
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
  });
  app.get('/login', (request, reply) => {
    reply.sendFile('login.html');
  });
}

// Error handling
app.setErrorHandler(errorHandler);

export default app;
