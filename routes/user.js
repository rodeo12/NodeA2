// routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Routes
router.post('/', usersController.createUser);
router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);

module.exports = router;
