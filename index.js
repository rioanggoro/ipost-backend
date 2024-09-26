const express = require('express');
const { Pool } = require('pg'); // PostgreSQL client
const bcrypt = require('bcryptjs'); // For password hashing
require('dotenv').config(); // Load .env file

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Create a pool (connection to the database) using DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Using DATABASE_URL from .env file
  ssl: {
    rejectUnauthorized: false, // Supabase often requires SSL, ensure it's set properly
  },
});

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log('Connected to DB at', result.rows[0].now);
  });
});

// Register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userCheck = await pool.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user into the database
    const newUser = await pool.query(
      'INSERT INTO "user" (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    // Return the created user (excluding the password)
    const { password: _, ...user } = newUser.rows[0];
    return res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      user,
    });
  } catch (err) {
    console.error('Error executing query', err.stack);
    return res.status(500).json({ message: 'Error registering user' });
  }
});

// Get user route
app.get('/user/:id', async (req, res) => {
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
    console.error('Error executing query', err.stack);
    return res.status(500).json({ message: 'Error getting user' });
  }
});

// Get all users route
app.get('/users', async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM "user"');
    return res.status(200).json(users.rows);
  } catch (err) {
    console.error('Error executing query', err.stack);
    return res.status(500).json({ message: 'Error getting user' });
  }
});

// Define your routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
