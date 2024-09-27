const jwt = require('jsonwebtoken');
const User = require('../model/user');

// Middleware to protect routes that require authentication
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token from header

      // Decode and verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by decoded ID and exclude password field
      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      next(); // Proceed to next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next(); // Proceed to next middleware or route handler
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

// Middleware to check if the user is either an admin or agent
const isAdminOrAgent = (req, res, next) => {
  if (req.user && (req.user.role === 'Admin' || req.user.role === 'Agent')) {
    next(); // Proceed to next middleware or route handler
  } else {
    res.status(403).json({ message: 'Not authorized' });
  }
};

module.exports = { protect, isAdmin, isAdminOrAgent };
