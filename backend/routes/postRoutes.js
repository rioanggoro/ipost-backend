const express = require('express');
const { getAllPosts, createPost } = require('../controller/postController');
const router = express.Router();
const upload = require('../middleware/multer');
router.get('/', getAllPosts);
router.post('/', upload.single('thumbnail'), createPost);

module.exports = router;
