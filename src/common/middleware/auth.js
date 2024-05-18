import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const serviceAccountPath = path.resolve('src/config/serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const authenticate = async (request, reply) => {
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    return reply.status(401).send({ message: 'No token provided' });
  }

  try {
    await admin.auth().verifyIdToken(token);
    return;
  } catch (error) {
    return reply.status(401).send({ message: 'Invalid token' });
  }
};

export default authenticate;
