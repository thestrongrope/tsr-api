import app from './app.js';

const start = async () => {
  try {
    const obj = { port: process.env.PORT || 3000 };
    app.listen(obj);
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
