const User = require('../models/AuthModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const crypto = require('crypto');
const nodemailer = require("nodemailer");

const jwtSecret = process.env.JWT_SECRET;

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'nodejs518@gmail.com',
      pass: 'nodejs518@123'
  }
});

const authController = {
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
              return res.status(400).json({ 
                status_code: 400,
                status: false,
                error: 'Invalid email' 
              });
            }
        
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
              return res.status(400).json({ 
                status_code: 400,
                status: false,
                error: 'Invalid password' 
              });
            }
        
            const token = jwt.sign({ email: user.email }, jwtSecret, {
              expiresIn: '1h'
            });
            res.status(200).json({ 
              status_code: 200,
              status: true,
              message: 'User logged in successfully',
              data: {
                token,
                email: user.email,
                username: user.username,
                password: user.password,
                created_at: user.created_at,
                _id: user._id,
                __v: user.__v
              }
            });
          } catch (error) {
            res.status(500).json({ 
              status_code: 500,
              status: false,
              error: 'Internal server error'
             });
          }
    },

    register: async (req, res) => {
        const { email, username, password } = req.body;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
              return res.status(400).json({ 
                status_code: 400,
                status: false,
                error: 'Email is already taken' 
              });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ email, username, password: hashedPassword });
            await user.save();
            res.status(200).json({ 
              data: user, 
              status_code: 200,
              status: true,
              message: 'User registered successfully' });
          } catch (error) {
            console.log('register error', error);
            res.status(500).json({ 
              status_code: 500,
              status: false,
              error: 'Internal server error' 
            });
        }
    },

    forgotPassword: async (req, res) => {
      const { email } = req.body;
      const user = await User.findOne({ email });
      console.log('user', user);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let mailDetails = {
        from: 'nodejs518@gmail.com',
        to: user.email,
        subject: 'Reset password mail',
        html: '<p> Reset password mail sent successfully </p>'
      };

      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000;
      await user.save();
      await mailTransporter.sendMail(mailDetails);
      res.send('Email sent successfully');
      res.json({ message: 'Password reset email sent' });
    }
}

module.exports = authController;
