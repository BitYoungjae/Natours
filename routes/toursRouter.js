import express from 'express';
import {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
  checkBody,
  checkId,
  checkIsIn,
} from '../controllers/toursHandler.js';

const router = express.Router();

router.param('id', checkId);
router.param('id', checkIsIn);

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
