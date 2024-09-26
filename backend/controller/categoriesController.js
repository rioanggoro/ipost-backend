const pool = require('../config/db');

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM "categories"');
    return res.status(200).json(categories.rows);
  } catch (err) {
    console.error('Error getting categories', err.stack);
    return res.status(500).json({ message: 'Error getting categories' });
  }
};

//create categories
const createCategories = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await pool.query(
      'INSERT INTO "categories" (name) VALUES ($1) RETURNING *',
      [name]
    );
    return res.status(201).json(newCategory.rows[0]);
  } catch (err) {
    console.error('Error creating category', err.stack);
    return res.status(500).json({ message: 'Error creating category' });
  }
};
module.exports = {
  getAllCategories,
  createCategories,
};
