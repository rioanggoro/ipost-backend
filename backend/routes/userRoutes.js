const express = require('express');
const {
  registerUser,
  getUserById,
  getAllUsers,
  loginUser,
} = require('../controller/userController');
const router = express.Router();

// Define user-related routes
router.post('/register', registerUser);
router.get('/user/:id', getUserById);
router.get('/users', getAllUsers);
router.post('/login', loginUser);
module.exports = router;
