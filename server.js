import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
const { PORT = 3000 } = process.env;

import('./app.js').then(({ default: app }) => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
  });
});
