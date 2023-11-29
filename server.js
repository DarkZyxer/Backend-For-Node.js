const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL database configuration
const db = mysql.createConnection({
  host: 'YOUR_RDS_ENDPOINT',
  user: 'USER',
  password: 'DB_PASSWORD',
  database: 'DB_NAME'
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connected to the database');
  }
});

// API endpoint to fetch items
app.get('/api/items', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) {
      res.status(500).send('Database error');
    } else {
      res.json(results);
    }
  });
});

// API endpoint to add an item
app.post('/api/items', (req, res) => {
  const itemName = req.query.name; // Get item name from query parameter

  db.query('INSERT INTO items (name) VALUES (?)', [itemName], (err) => {
    if (err) {
      res.status(500).send('Failed to add item');
    } else {
      res.status(201).send('Item added successfully');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
