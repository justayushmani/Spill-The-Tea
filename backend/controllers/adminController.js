import { User } from '../models/User.js';
import { TraumaPost } from '../models/TraumaPost.js';


export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

export const promoteToModerator = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  user.role = 'moderator';
  await user.save();

  res.json({ msg: 'User promoted to moderator' });
};

// Demote moderator to user
export const demoteToUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  user.role = 'user';
  await user.save();

  res.json({ msg: 'Moderator demoted to user' });
};

// Basic app stats
export const getStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalPosts = await TraumaPost.countDocuments();
  const pendingPosts = await TraumaPost.countDocuments({
    status: 'pending'
  });

  res.json({
    totalUsers,
    totalPosts,
    pendingPosts
  });
};
