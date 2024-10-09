const fetchuser = require("../middleware/fetchuser");
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "tajwoneisagoodb$oy"; // Secret key for JWT

// Create a User: POST "/api/auth/createuser" (Route 1)
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }), // Validate name
    body("email", "Enter a valid email").isEmail(), // Validate email
    body("password", "Password must be at least 5 characters").isLength({
      min: 5,
    }), // Validate password
  ],
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const salt = await bcrypt.genSalt(10); // Generate salt
      const secPass = await bcrypt.hash(req.body.password, salt); // Hash password
      const user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      }); // Create user
      const authToken = jwt.sign({ user: { id: user.id } }, JWT_SECRET); // Generate JWT
      res.json({ authToken }); // Send token
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message }); // Handle server errors
    }
  }
);

// Authenticate a User: POST "/api/auth/login" (Route 2)
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(), // Validate email
    body("password", "Password cannot be blank").exists(), // Ensure password is provided
  ],
  async (req, res) => {
    const errors = validationResult(req); // Check for validation errors
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body; // Destructure input
    try {
      let user = await User.findOne({ email }); // Find user by email
      if (!user) return res.status(400).json({ error: "Invalid credentials1" }); // User not found

      const passCompare = await bcrypt.compare(password, user.password); // Compare passwords
      if (!passCompare) return res.status(400).json({ error: "Invalid credentials2" }); // Incorrect password

      const authtoken = jwt.sign({ user: { id: user.id } }, JWT_SECRET); // Generate JWT
      res.json({ authtoken }); // Send token
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message }); // Handle server errors
    }
  }
);
// Get logged in User Details: POST "/api/auth/getUser" (Route 3)
router.get("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router; // Export the router
