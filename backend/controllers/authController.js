const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt for username:", username);
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // console.log("User found:", user.username);
    // console.log("Stored hashed password:", user.password);
    // console.log("Provided password:", password);
    // const isMatch = await user.comparePassword(password);
    // console.log("Password match:", isMatch);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message });
  }
};
