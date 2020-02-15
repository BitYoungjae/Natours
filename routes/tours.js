import express from 'express';
import {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
  checkBody,
  checkId,
} from '../controllers/tours.js';

const router = express.Router();

router.param('id', checkId);

router
  .route('/')
  .get(getAllTours)
  .post(checkBody, createTour); // multiple handlers

router
  .route('/:id')
  .get(getTour)
  .delete(deleteTour)
  .patch(updateTour);

export default router;
