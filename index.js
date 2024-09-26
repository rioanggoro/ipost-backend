const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config(); // Load environment variables

// Middleware
app.use(express.json());

// Import routes
const userRoutes = require('./backend/routes/userRoutes');
app.use('/', userRoutes);

// // Base route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
