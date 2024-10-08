const express = require('express');
const User = require('../models/User'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

const JWT_secret = 'tajwoneisagoodb$oy'; 

// Create a User: POST "/api/auth/createuser"
router.post('/createuser',
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      const salt = await bcrypt.genSalt(10); // Generate salt
      const secPass = await bcrypt.hash(req.body.password, salt); // Hash password
      
      const user = await User.create({ // Create user
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      
      const authToken = jwt.sign({ user: { id: user.id } }, JWT_secret); // Generate JWT
      res.json({ authToken }); // Send token
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message }); // Handle errors
    }
  }
);

module.exports = router;
