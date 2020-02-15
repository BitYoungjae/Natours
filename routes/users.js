import express from 'express';
// prettier-ignore
import { 
  getAllUsers,
  createUser 
} from '../controllers/users.js';

const router = express.Router();
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

const ph = () => 1;
router
  .route('/:id')
  .get(ph)
  .delete(ph)
  .patch(ph);

export default router;
