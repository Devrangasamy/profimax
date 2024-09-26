const express = require('express');
const { registerUser, loginUser } = require('../controller/userController'); // Ensure this path is correct
const router = express.Router();

router.post('/register', registerUser); // Ensure registerUser is defined and imported
router.post('/login', loginUser); // Ensure loginUser is defined and imported

module.exports = router;
