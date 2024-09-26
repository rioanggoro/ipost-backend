const pool = require('../config/db');

// Get all like by post id
const getLikesByPostId = async (req, res) => {
  const postId = req.params.postId;
  try {
    // Query to count the number of likes for a specific post
    const result = await pool.query(
      'SELECT COUNT(*) FROM "like" WHERE post_id = $1',
      [postId]
    );

    // Extract the count value from the result
    const likesCount = result.rows[0].count;

    return res.status(200).json({ postId, likes: parseInt(likesCount, 10) });
  } catch (err) {
    console.error('Error getting likes count', err.stack);
    return res.status(500).json({ message: 'Error getting likes' });
  }
};

const createLikes = async (req, res) => {
  const { user_id, post_id } = req.body;

  // Log to check if user_id and post_id are being passed correctly
  console.log('Received user_id:', user_id, 'Received post_id:', post_id);

  try {
    const newLike = await pool.query(
      'INSERT INTO "like" (user_id, post_id) VALUES ($1, $2) RETURNING *',
      [user_id, post_id]
    );
    return res.status(201).json(newLike.rows[0]);
  } catch (err) {
    console.error('Error creating like', err.stack);
    return res.status(500).json({ message: 'Error creating like' });
  }
};

module.exports = {
  getLikesByPostId,
  createLikes,
};
