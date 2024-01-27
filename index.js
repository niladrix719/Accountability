const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
require('dotenv').config();

// Controllers

const { getAllUsers, createUser, loginUser } = require('./controllers/userController');

// Middlewares

app.use(cors());
app.use(express.json());

// Routes

app.post('/signup', createUser);
app.get('/users', getAllUsers);
app.post('/login', loginUser);

app.get('/', (req, res) => {
  res.send('Hi from the server!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
