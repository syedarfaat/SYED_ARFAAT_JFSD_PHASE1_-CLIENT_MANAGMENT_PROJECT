const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const PORT = 3001; // Change the port if needed

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options('*', cors());
app.use(cors({
    origin: 'http://localhost:4200', // Replace with your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // Allow credentials if needed
}));

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user: 'root', // Your MySQL username
    password: 'root123', // Your MySQL password
    database: 'client_database' // Your MySQL database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Function to hash passwords
const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
};
app.get('/',(req,res)=>{
    res.send("this is 3000. server positive")
})


// User Registration
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    db.query(sql, [username, email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(201).json({ id: result.insertId, username, email });
    });
});

// User Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(sql, [email, hashedPassword], (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

        const user = results[0];
        res.json({ id: user.id, username: user.username, email: user.email });
    });
});

// Meeting Routes
app.post('/api/meetings', (req, res) => {
    const { title, date, time, userId } = req.body;
    const sql = 'INSERT INTO meetings (title, date, time, userId) VALUES (?, ?, ?, ?)';

    db.query(sql, [title, date, time, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(201).json({ id: result.insertId, title, date, time, userId });
    });
});

// Get Meetings for a User
app.get('/api/meetings/:userId', (req, res) => {
    const sql = 'SELECT * FROM meetings WHERE userId = ?';
    db.query(sql, [req.params.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json(results);
    });
});

// Update Meeting
app.put('/api/meetings/:id', (req, res) => {
    const { title, date, time } = req.body;
    const sql = 'UPDATE meetings SET title = ?, date = ?, time = ? WHERE id = ?';

    db.query(sql, [title, date, time, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json({ id: req.params.id, title, date, time });
    });
});

// Delete Meeting
app.delete('/api/meetings/:id', (req, res) => {
    const sql = 'DELETE FROM meetings WHERE id = ?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(204).send();
    });
});

// Portfolio Routes
app.get('/api/portfolios/:userId', (req, res) => {
    const sql = 'SELECT * FROM portfolios WHERE userId = ?';
    db.query(sql, [req.params.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json(results);
    });
});

app.post('/api/portfolios', (req, res) => {
    const { name, description, userId } = req.body;
    const sql = 'INSERT INTO portfolios (name, description, userId) VALUES (?, ?, ?)';

    db.query(sql, [name, description, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(201).json({ id: result.insertId, name, description, userId });
    });
});

app.put('/api/portfolios/:id', (req, res) => {
    const { name, description } = req.body;
    const sql = 'UPDATE portfolios SET name = ?, description = ? WHERE id = ?';

    db.query(sql, [name, description, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json({ id: req.params.id, name, description });
    });
});

app.delete('/api/portfolios/:id', (req, res) => {
    const sql = 'DELETE FROM portfolios WHERE id = ?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(204).send();
    });
});

// Project Task Routes
app.get('/api/project-tasks/:userId', (req, res) => {
    const sql = 'SELECT * FROM project_tasks WHERE userId = ?';
    db.query(sql, [req.params.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        res.json(results);
    });
});

app.post('/api/project-tasks', (req, res) => {
    const { title, status, userId } = req.body;
    const sql = 'INSERT INTO project_tasks (title, status, userId) VALUES (?, ?, ?)';

    db.query(sql, [title, status, userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(201).json({ id: result.insertId, title, status, userId });
    });
});

app.put('/api/project-tasks/:id', (req, res) => {
    const { title, status } = req.body;
    const sql = 'UPDATE project_tasks SET title = ?, status = ? WHERE id = ?';

    db.query(sql, [title, status, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.json({ id: req.params.id, title, status });
    });
});

app.delete('/api/project-tasks/:id', (req, res) => {
    const sql = 'DELETE FROM project_tasks WHERE id = ?';

    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.sqlMessage });
        }
        res.status(204).send();
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    

});