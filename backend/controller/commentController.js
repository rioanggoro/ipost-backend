const pool = require('../config/db');

// Get all comment by post id controller
const getCommentsByPostId = async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await pool.query(
      'SELECT * FROM "comment" WHERE post_id = $1',
      [postId]
    );
    return res.status(200).json(comments.rows);
  } catch (err) {
    console.error('Error getting comments', err.stack);
    return res.status(500).json({ message: 'Error getting comments' });
  }
};

//create comment
const createComment = async (req, res) => {
  const { user_id, post_id, content } = req.body;
  try {
    const newComment = await pool.query(
      'INSERT INTO "comment" (user_id, post_id, content) VALUES ($1, $2, $3) RETURNING *',
      [user_id, post_id, content]
    );
    return res.status(201).json(newComment.rows[0]);
  } catch (err) {
    console.error('Error creating comment', err.stack);
    return res.status(500).json({ message: 'Error creating comment' });
  }
};

module.exports = {
  getCommentsByPostId,
  createComment,
};
