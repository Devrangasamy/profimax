const express = require('express');
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controller/userController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/users/login
// @desc    Login user & get token
// @access  Public
router.post('/login', login);

// @route   GET /api/users
// @desc    Get all users (Admin only)
// @access  Private/Admin
router.get('/', protect, isAdmin, getAllUsers);

// @route   GET /api/users/:id
// @desc    Get a single user by ID
// @access  Private/Admin
router.get('/:id', protect, isAdmin, getUserById);

// @route   PUT /api/users/:id
// @desc    Update user details (Admin only)
// @access  Private/Admin
router.put('/:id', protect, isAdmin, updateUser);

// @route   DELETE /api/users/:id
// @desc    Delete a user (Admin only)
// @access  Private/Admin
router.delete('/:id', protect, isAdmin, deleteUser);

module.exports = router;
