import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

// 🔑 Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// 📝 Register
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const user = await User.create({
    username,
    email,
    password
  });

  const token = generateToken(user);

  res.status(201).json({
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role
    }
  });
};

// 🔓 Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      role: user.role
    }
  });
};

// 👤 Get logged-in user
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};
