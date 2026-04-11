import Fastify from 'fastify';
import cors from '@fastify/cors';
import mongoose from 'mongoose';

const fastify = Fastify({
  logger: true
});

// Register plugins
fastify.register(cors);

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'brew-cli' };
});

// Run the server!
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fastify-brew');
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
