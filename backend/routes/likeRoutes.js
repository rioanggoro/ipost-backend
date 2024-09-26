const express = require('express');
const {
  getLikesByPostId,
  createLikes,
} = require('../controller/likeController');
const router = express.Router();

router.get('/:postId', getLikesByPostId);
router.post('/', createLikes);
module.exports = router;
