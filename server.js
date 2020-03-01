import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const {
  PORT = 3000,
  DATABASE,
  DATABASE_DBNAME,
  DATABASE_PASSWORD,
} = process.env;

// prettier-ignore
const DB = DATABASE
.replace(
  /<PASSWORD>/i,
  DATABASE_PASSWORD
)
.replace(
  /<DBNAME>/i,
  DATABASE_DBNAME,
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  console.log('DB Connection successful!');
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected');
});

process.on('SIGINT', mongoose.disconnect);
process.on('exit', mongoose.disconnect);

import('./app.js').then(({ default: app }) => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
  });
});
