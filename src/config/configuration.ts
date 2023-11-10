import * as dotenv from 'dotenv';
import * as fs from 'fs';

const envConfigFilePath = `${process.cwd()}/.env`;

// Check if the config file exists
if (!fs.existsSync(envConfigFilePath)) {
  throw new Error(
    'You have to install this application first with bin/install.sh script.'
  );
}

dotenv.config({ path: envConfigFilePath });

export const Config = {
  port: parseInt(process.env.PORT, 10) || 3000,
  db: {
    dialect: process.env.DB_DIALECT || 'mysql',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'easyadmin',
    username: process.env.DB_USERNAME || 'easyadmin',
    password: process.env.DB_PASSWORD || 'easyadmin',
    port: parseInt(process.env.DB_PORT, 10) || 3306
  }
};
