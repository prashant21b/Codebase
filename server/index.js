// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors=require('cors')
const app = express();
const port = process.env.PORT || 3001;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sk@12345',
  database: 'Codebase'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());
app.use(cors())
// Routes
app.post('/submit', (req, res) => {
  const { username, language, stdin, code } = req.body;
  const snippet = { username, language, stdin: JSON.stringify(stdin), code }; // Convert stdin to JSON string
  console.log(req.body)
  // Save snippet to MySQL
  const sql = 'INSERT INTO snippets SET ?';
  db.query(sql, snippet, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to submit snippet' });
    } else {
      res.status(201).json({ message: 'Snippet submitted successfully' });
    }
  });
});

app.get('/snippets', (req, res) => {
    // Retrieve snippets from MySQL
    const sql = 'SELECT username, language, stdin, code, timestamp FROM snippets';
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Failed to retrieve snippets' });
      } else {
        // Parse stdin from JSON string to array
        const snippets = results.map(snippet => {
          return {
            ...snippet,
            stdin: JSON.parse(snippet.stdin)
          };
        });
        res.json(snippets);
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
