import User from '../models/User.js';

export const updateLastActive = async (req, res, next) => {
  if (req.user) {
    try {
      await User.findByIdAndUpdate(req.user.id, { lastActive: new Date() });
    } catch (error) {
      console.error('Failed to update last active time:', error);
    }
  }
  next();
};
