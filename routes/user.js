// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes
router.post('/', usersController.createUser); //Create User
router.get('/', authMiddleware,usersController.getUsers); //Get All Users
router.get('/:id',authMiddleware, usersController.getUserById); //Get User By Id
router.get('/analytics',authMiddleware, usersController.getUserAnalytics); // Analytics endpoint

module.exports = router;
