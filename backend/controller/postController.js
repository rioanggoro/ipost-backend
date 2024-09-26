const pool = require('../config/db');

// Get all posts controller
const getAllPosts = async (req, res) => {
  try {
    const posts = await pool.query('SELECT * FROM "post"');
    return res.status(200).json(posts.rows);
  } catch (err) {
    console.error('Error getting posts', err.stack);
    return res.status(500).json({ message: 'Error getting posts' });
  }
};

//Create Post
const createPost = async (req, res) => {
  const { user_id, title, content, category_id } = req.body;
  const thumbnail = req.file ? req.file.filename : null;
  if (!thumbnail)
    return res.status(400).json({ message: 'Thumbnail is required' });
  try {
    const newPost = await pool.query(
      'INSERT INTO "post" (user_id,title, content,category_id,thumbnail) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, title, content, category_id, thumbnail]
    );
    return res.status(201).json(newPost.rows[0]);
  } catch (err) {
    console.error('Error creating post', err.stack);
    return res.status(500).json({ message: 'Error creating post' });
  }
};

module.exports = {
  getAllPosts,
  createPost,
};
