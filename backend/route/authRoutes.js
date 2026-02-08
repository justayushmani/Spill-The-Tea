import express from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController.js';
import { verifyJWT as auth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected
router.get('/me', auth, getMe);

export default router;
