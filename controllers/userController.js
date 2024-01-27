const pool = require('../db');
const jwt = require('jsonwebtoken');

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

// create a user / signup

const createUser = async (req, res) => {
  try{
    const { username, password, email } = req.body;
    pool.query('INSERT INTO users (username, password, email, created_on) VALUES ($1, $2, $3, $4) RETURNING *', [username, password, email, new Date()], (err, results) => {
      if(err){
        throw err;
      }
      
      const token = jwt.sign({ id: results.rows[0].id }, process.env.JWT_SECRET);

      res.status(201).json({
        status: 'success',
        token,
        data: {
          user: results.rows[0]
        }
      });
    });
  }
  catch(err){
    console.error(err.message);
  }
}

// login a user

const loginUser = async (req, res) => {
  try{
    const { email, password } = req.body;
    pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err, results) => {
      if(err){
        throw err;
      }
      const token = jwt.sign({ id: results.rows[0].id }, process.env.JWT_SECRET);

      res.status(200).json({
        status: 'success',
        token,
        data: {
          user: results.rows[0]
        }
      });
    });
  }
  catch(err){
    console.error(err.message);
  }
}

module.exports = { getAllUsers, createUser, loginUser };
