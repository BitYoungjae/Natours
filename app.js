import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/toursRouter.js';

const app = express();
const { NODE_ENV } = process.env;

// Use middlewares
if (NODE_ENV === 'development') app.use(morgan('dev')); // logging
app.use(express.json()); // parse body of request and append it to req.body

app.use((req, res, next) => {
  req.date = Date.now();
  next();
});

app.use('/api/v1/tours/', tourRouter);

export default app;
