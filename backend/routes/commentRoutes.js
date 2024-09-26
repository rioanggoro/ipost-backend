const express = require('express');
const {
  getCommentsByPostId,
  createComment,
} = require('../controller/commentController');
const router = express.Router();
router.get('/:postId', getCommentsByPostId);
router.post('/', createComment);
module.exports = router;
