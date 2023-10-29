const User = require('../models/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const authController = {
    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (!user) {
              return res.status(400).json({ error: 'Invalid username or password' });
            }
        
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
              return res.status(400).json({ error: 'Invalid username or password' });
            }
        
            const token = jwt.sign({ username: user.username }, jwtSecret, {
              expiresIn: '1h'
            });
            res.status(200).json({ token });
          } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
          }
    },

    register: async (req, res) => {
        const { username, password } = req.body;
        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
              return res.status(400).json({ error: 'Username is already taken' });
            }
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = new User({ username, password: hashedPassword });
          await user.save();
          res.status(200).json({ message: 'User registered successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = authController;
