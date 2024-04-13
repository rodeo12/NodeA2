// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Routes
router.post('/', usersController.createUser); //Create User
router.get('/', usersController.getUsers); //Get All Users
router.get('/:id', usersController.getUserById); //Get User By Id
router.get('/analytics', usersController.getUserAnalytics); // Analytics endpoint

module.exports = router;
