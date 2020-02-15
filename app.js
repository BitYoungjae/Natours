import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tours.js';
import userRouter from './routes/users.js';

const app = express();

// Use middlewares
app.use(morgan('dev')); // logging
app.use(express.json()); // parse body of request and append it to req.body

app.use((req, res, next) => {
  req.date = Date.now();
  next();
});

app.use('/api/v1/tours/', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
