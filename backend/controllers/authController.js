const User = require('../models/userModel');
const generateToken = require('../utility/generateToken');
const bcrypt = require('bcryptjs');

const signUp = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log("Signup request body:", req.body);

    if (!fullName || !email || !password) {
      return res.status(400).json({ msg: 'Please fill all the fields' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    await newUser.save();

    generateToken(newUser._id, res);

    res.status(201).json({
      msg: 'User registered successfully',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please fill all the fields' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    generateToken(user._id, res);

    res.status(200).json({
      msg: 'User logged in successfully',
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ msg: 'User logged out successfully' });
};

const updateProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded. Use key 'profilePic'" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.profilePic = req.file.path;
    await user.save();

    res.status(200).json({
      msg: "Profile picture updated successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      }
    });

  } catch (error) {
    console.error("Profile pic error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

const check = (req, res) => {
  res.status(200).json({
    msg: "User authenticated",
    user: req.user
  });
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ users });
    }   
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server Error' });
    }   
}

module.exports = { signUp, login, logout, updateProfilePic, check, getAllUsers };
