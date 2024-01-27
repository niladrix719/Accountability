const pool = require('../db');

// get all users

const getAllUsers = async (req, res) => {
  try{
    pool.query('SELECT * FROM users', (err, results) => {
      if(err){
        throw err;
      }
      res.status(200).json(results.rows);
    });
  }
  catch(err){
    console.error(err.message);
  }
}

// create a user

const createUser = async (req, res) => {
  try{
    const { username, password, email } = req.body;
    pool.query('INSERT INTO users (username, password, email, created_on) VALUES ($1, $2, $3, $4)', [username, password, email, new Date()], (err, results) => {
      if(err){
        throw err;
      }
      res.status(201).send(`User added with ID: ${results.insertId}`);
    });
  }
  catch(err){
    console.error(err.message);
  }
}

module.exports = { getAllUsers, createUser };
