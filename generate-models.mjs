import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const modelsDir = path.resolve('src/models');

const command = `npx sequelize-auto -o "${modelsDir}" -d ${process.env.DB_NAME} -h ${process.env.DB_HOST} -u ${process.env.DB_USER} -p ${process.env.DB_PORT} -x ${process.env.DB_PASSWORD} -e mysql --caseModel p --caseFile k --caseProp c --lang esm`;

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }

  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);  
});
