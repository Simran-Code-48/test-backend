const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
// Middleware
app.use(express.json());

// Routes

app.get('/do', (req, res) => {
    res.send('Hello from Express server!');
});

// Todo Route
app.get('/api/todos', (req, res) => {
    // Here, you would retrieve todos from the database
    res.json([{ id: 1, text: 'Todo 1' }, { id: 2, text: 'Todo 2' }]);
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
