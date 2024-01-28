const pool = require('../db');
const jwt = require('jsonwebtoken');

// get all classes

const getAllClasses = async (req, res) => {
  try{
    pool.query('SELECT * FROM classes', (err, results) => {
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

// create a class

const createClass = async (req, res) => {
  try {
    const { class_name, class_description } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decoded;

    const classResult = await pool.query(
      'INSERT INTO classes (class_name, class_description, class_admin, total_members) VALUES ($1, $2, $3, $4) RETURNING *',
      [class_name, class_description, id, 1]
    );

    const classId = classResult.rows[0].id;

    await pool.query(
      'INSERT INTO class_members (class_id, user_id) VALUES ($1, $2)',
      [classId, id]
    );

    res.status(201).json({
      status: 'success',
      data: {
        class: classResult.rows[0],
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }
};

// join a class

const joinClass = async (req, res) => {
  try {
    const { class_name } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decoded;

    const classResult = await pool.query('SELECT * FROM classes WHERE class_name = $1', [class_name]);

    if (classResult.rows.length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Class not found',
      });
      return;
    }

    const class_id = classResult.rows[0].id;

    const isMemberQuery = await pool.query('SELECT * FROM class_members WHERE class_id = $1 AND user_id = $2', [class_id, id]);

    if (isMemberQuery.rows.length > 0) {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'You are already a member of this class',
        },
      });
      return;
    }

    await pool.query('INSERT INTO class_members (class_id, user_id) VALUES ($1, $2)', [class_id, id]);

    res.status(200).json({
      status: 'success',
      data: {
        message: 'Joined the class successfully',
      },
    });

    await pool.query('UPDATE classes SET total_members = total_members + 1 WHERE id = $1', [class_id]);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }
};

// get all members of a class

const getAllClassMembers = async (req, res) => {
  try {
    const { class_name } = req.body;

    const classResult = await pool.query('SELECT * FROM classes WHERE class_name = $1', [class_name]);

    if (classResult.rows.length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Class not found',
      });
      return;
    }

    const class_id = classResult.rows[0].id;

    const membersResult = await pool.query('SELECT * FROM class_members WHERE class_id = $1', [class_id]);

    const members = [];

    for (let i = 0; i < membersResult.rows.length; i++) {
      const member = await pool.query('SELECT * FROM users WHERE id = $1', [membersResult.rows[i].user_id]);

      members.push(member.rows[0]);
    }

    res.status(200).json({
      status: 'success',
      data: {
        members,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }
}

module.exports = { getAllClasses, createClass, joinClass, getAllClassMembers };
