import express from 'express';
import { approveTrauma, deleteTrauma, createTrauma, getApprovedTraumas, getPendingTraumas, upvoteTrauma } from '../controllers/TraumaController.js';
import { verifyJWT as auth } from '../middleware/authMiddleware.js';
import { allowRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public
router.post('/', auth, createTrauma);
router.get('/', getApprovedTraumas);

// Moderator/Admin only
router.get(
  '/pending',
  auth,
  allowRoles('moderator', 'admin'),
  getPendingTraumas
);

// Moderator/Admin only
router.patch(
  '/approve/:id',
  auth,
  allowRoles('moderator', 'admin'),
  approveTrauma
);

router.delete(
  '/:id',
  auth,
  allowRoles('moderator', 'admin'),
  deleteTrauma
);

router.post(
  '/:id/upvote',
  auth,
  upvoteTrauma
);

export default router;
