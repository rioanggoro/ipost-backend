const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get user by ID controller
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await pool.query('SELECT * FROM "user" WHERE id_user = $1', [
      userId,
    ]);
    if (user.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user.rows[0]);
  } catch (err) {
    console.error('Error getting user', err.stack);
    return res.status(500).json({ message: 'Error getting user' });
  }
};

// Get all users controller
const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM "user"');
    return res.status(200).json(users.rows);
  } catch (err) {
    console.error('Error getting users', err.stack);
    return res.status(500).json({ message: 'Error getting users' });
  }
};

// Register user controller
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userCheck = await pool.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    const { password: _, ...user } = newUser.rows[0];
    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      user,
    });
  } catch (err) {
    console.error('Error registering user', err.stack);
    return res.status(500).json({ message: 'Error registering user' });
  }
};

// Login user controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists in the database
    const user = await pool.query('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const foundUser = user.rows[0];

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: foundUser.id_user, email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Return token and user information (excluding the password)
    const { password: _, ...userWithoutPassword } = foundUser;
    return res.status(200).json({
      message: 'Login successful',
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    console.error('Error during login', err.stack);
    return res.status(500).json({ message: 'Error logging in' });
  }
};

module.exports = {
  registerUser,
  getUserById,
  getAllUsers,
  loginUser,
};
