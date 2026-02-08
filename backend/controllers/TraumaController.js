import { TraumaPost } from '../models/TraumaPost.js';

// POST /api/trauma
export const createTrauma = async (req, res) => {
  const { content, tags } = req.body;

  if (!content) {
    return res.status(400).json({ msg: 'Content is required' });
  }

  const post = await TraumaPost.create({
    content,
    tags,
    createdBy: req.user._id   // stored but never shown
  });

  res.status(201).json({
    msg: 'Trauma submitted for approval',
    postId: post._id
  });
};

// GET /api/trauma
export const getApprovedTraumas = async (req, res) => {
  const posts = await TraumaPost.find({ status: 'approved' })
    .sort({ createdAt: -1 })
    .select('-createdBy -upvotedBy'); // privacy

  res.json(posts);
};

// GET /api/trauma/pending
export const getPendingTraumas = async (req, res) => {
  const posts = await TraumaPost.find({ status: 'pending' })
    .sort({ createdAt: -1 });

  res.json(posts);
};

// PATCH /api/trauma/approve/:id
export const approveTrauma = async (req, res) => {
  const post = await TraumaPost.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: 'Post not found' });
  }

  post.status = 'approved';
  await post.save();

  res.json({ msg: 'Trauma approved' });
};

// PATCH /api/trauma/reject/:id
export const rejectTrauma = async (req, res) => {
  const post = await TraumaPost.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: 'Post not found' });
  }

  post.status = 'rejected';
  await post.save();

  res.json({ msg: 'Trauma rejected' });
};

// DELETE /api/trauma/:id
export const deleteTrauma = async (req, res) => {
  const post = await TraumaPost.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ msg: 'Post not found' });
  }

  await post.deleteOne();
  res.json({ msg: 'Trauma deleted' });
};

// POST /api/trauma/:id/upvote
export const upvoteTrauma = async (req, res) => {
  const post = await TraumaPost.findById(req.params.id);

  if (!post || post.status !== 'approved') {
    return res.status(404).json({ msg: 'Post not found' });
  }

  // prevent double upvote
  if (post.upvotedBy.includes(req.user._id)) {
    return res.status(400).json({ msg: 'Already upvoted' });
  }

  post.upvotes += 1;
  post.upvotedBy.push(req.user._id);

  await post.save();

  res.json({ upvotes: post.upvotes });
};
