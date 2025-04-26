const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const DB_PATH = path.join(__dirname, 'db.json');
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET /api/tasks → return array of tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        const tasks = JSON.parse(data);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Could not read tasks.' });
    }
});

// POST /api/tasks → add a new task { title, timestamp }
app.post('/api/tasks', async (req, res) => {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: 'Title is required.' });
    }

    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        const tasks = JSON.parse(data);
        const newTask = { title: title.trim(), timestamp: Date.now() };
        tasks.push(newTask);
        await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Could not save task.' });
    }
});

// DELETE /api/tasks/:timestamp → remove task by timestamp
app.delete('/api/tasks/:timestamp', async (req, res) => {
    const timestamp = Number(req.params.timestamp);
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        const tasks = JSON.parse(data);
        const filtered = tasks.filter(t => t.timestamp !== timestamp);
        await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Could not delete task.' });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
