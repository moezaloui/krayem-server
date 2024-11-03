const User = require('../models/UserModel'); // Adjust path as necessary
const bcrypt = require('bcrypt');

// **Register User**
const register = async (req, res) => {
  const { firstName, lastName, email, pwd, picture } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(pwd, 10);
    const newUser = new User({ firstName, lastName, email, picture, pwd: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// **Login User**
const login = async (req, res) => {
  const { email, pwd } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(pwd, user.pwd);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return the user info and a success message
    res.json({
      message: 'Login successful!',
      user
    });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// edite user with id
const updateUserById = async (req, res) => {
  const userId = req.params.id; // Get user ID from params
  const updates = req.body; // Get updates from request body
  try {
    // Find user by ID and update with new data
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const EditPwd = async (req, res) => {
  const userId = req.params.id;
  const { currentPwd, newPwd } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPwd, user.pwd);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPwd, 10);

    user.pwd = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'An error occurred while updating the password' });
  }
};

module.exports = {
  register,
  login,
  getUser,
  updateUserById,
  EditPwd,
};
