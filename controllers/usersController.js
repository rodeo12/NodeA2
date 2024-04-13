// controllers/usersController.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const usersController = {
    //Create User
    createUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newUser = new User({ email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    //Get All Users
    getUsers: async (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        try {
            const users = await User.find().skip(skip).limit(limit);
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

      // Analytics endpoint
      getUserAnalytics: async (req, res) => {
        try {
            const analyticsData = await User.aggregate([
                {
                    $group: {
                        _id: { $month: '$createdAt' }, // Extract month from createdAt field
                        count: { $sum: 1 }, // Count users in each month
                    },
                },
            ]);

            res.status(200).json(analyticsData);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    //Get User By Id
    getUserById: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = usersController;
