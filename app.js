const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let todos = [
    { id: 1, text: 'Todo 1' },
    { id: 2, text: 'Todo 2' }
];
let nextId = 3;

// Create Todo
app.post('/api/todos', (req, res) => {
    const newTodo = { id: nextId++, text: req.body.text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Read All Todos
app.get('/', (req, res) => {
    res.json(todos);
});

// Read Single Todo
app.get('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === todoId);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
});

// Update Todo
app.put('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const updatedText = req.body.text;
    const todo = todos.find(todo => todo.id === todoId);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todo.text = updatedText;
    res.json(todo);
});

// Delete Todo
app.delete('/api/todos/:id', (req, res) => {
    const todoId = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === todoId);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
