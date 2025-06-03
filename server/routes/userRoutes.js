const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');

// need to use the password from google account settings
// How to get your Gmail App Password:
// Go to Google Account Security.

// Make sure 2-Step Verification is enabled on your account.

// Scroll down to “App passwords” and click it.

// Select Mail as the app, and Other (Custom name) for the device (like “NodeMailer”).

// Click Generate.

// Copy the 16-character app password shown (it looks like abcd efgh ijkl mnop, but you write it as a continuous string with no spaces).

// Use this exact app password in your code:



// 🔹 Route: Register a new user and send email
router.post('/register', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required' });
  }

  try {
    // Save user to MongoDB
    const newUser = new User({ name, email });
    await newUser.save();

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ashitaj27@gmail.com',         // ✅ Replace with your Gmail
        pass: 'hepgzsvsyvwszdgq'       // ✅ Use Gmail App Password (NOT your real password)
      }
    });

    // Email content
    const mailOptions = {
      from: '"Notifier" <ashitaj27@gmail.com>',
      to: 'ashitaj27@gmail.com',
      subject: 'New User Registration',
      text: `Hi,\n\n${name} wants to connect to you.`
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success with user data
    res.status(201).json(newUser);

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// 🔹 Route: Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = router;
