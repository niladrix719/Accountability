const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
require('dotenv').config();

// Controllers

const { getAllUsers, createUser, loginUser } = require('./controllers/userController');
const { getAllClasses, createClass, joinClass, getAllClassMembers } = require('./controllers/classController');
const { getAllProjects, createProject, joinProject, getAllProjectMembers } = require('./controllers/projectController');

// Middlewares

app.use(cors());
app.use(express.json());

// Routes

app.get('/users', getAllUsers);
app.post('/signup', createUser);
app.post('/login', loginUser);

app.get('/projects', getAllProjects);
app.post('/create/project', createProject);
app.post('/join/project', joinProject);
app.post('/project/members', getAllProjectMembers);

app.get('/classes', getAllClasses);
app.post('/create/class', createClass);
app.post('/join/class', joinClass);
app.post('/class/members', getAllClassMembers);

app.get('/', (req, res) => {
  res.send('Hi from the server!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
