import express from 'express';
import {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
} from '../controllers/toursHandler.js';

const router = express.Router();

router
  .route('/')
  .get(getAllTours)
  .post(createTour); // multiple handlers

router
  .route('/:id')
  .get(getTour)
  .delete(deleteTour)
  .patch(updateTour);

export default router;
