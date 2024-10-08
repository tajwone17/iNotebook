const express = require('express');
const User = require('../models/User');
const router = express.Router(); 
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',
  // Validations for request body
  [
    body('name', 'Enter a valid name').isLength({ min: 3 }), // Name must be at least 3 characters
    body('email', 'Enter a valid email').isEmail(),          // Email must be valid
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }), // Password must be at least 5 characters
  ],
  // Asynchronous route handler
  async (req, res) => {
    // Validate the request body for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are errors, respond with a 400 status and the errors
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      // Attempt to create a new user in the database
      const user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
      });
      // Respond with the created user object
      res.json(user);
    } catch (err) {
      // Log any errors to the console
      console.error(err);
      // Respond with a 500 status and the error message
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router; // Export the router for use in other parts of the application
