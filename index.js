const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config(); // Load environment variables
const path = require('path');
// Middleware
app.use(express.json());

// Import routes
const userRoutes = require('./backend/routes/userRoutes');
app.use('/users', userRoutes);

const postRoutes = require('./backend/routes/postRoutes');
app.use('/posts', postRoutes);

const likeRoutes = require('./backend/routes/likeRoutes');
app.use('/likes', likeRoutes);

const commentRoutes = require('./backend/routes/commentRoutes');
app.use('/comments', commentRoutes);

const categoryRoutes = require('./backend/routes/categoriesRoutes');
app.use('/categories', categoryRoutes);

// // Base route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
