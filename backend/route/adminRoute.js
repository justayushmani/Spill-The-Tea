import express from 'express';
import { getAllUsers, promoteToModerator, demoteToUser, getStats } from '../controllers/adminController.js';
import { verifyJWT as auth } from '../middleware/authMiddleware.js';
import { allowRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Admin only routes
router.get(
  '/users',
  auth,
  allowRoles('admin'),
  getAllUsers
);

router.patch(
  '/promote/:id',
  auth,
  allowRoles('admin'),
  promoteToModerator
);

router.patch(
  '/demote/:id',
  auth,
  allowRoles('admin'),
  demoteToUser
);

router.get(
  '/stats',
  auth,
  allowRoles('admin'),
  getStats
);

export default router;
