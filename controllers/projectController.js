const pool = require('../db');
const jwt = require('jsonwebtoken');

// get all projects

const getAllProjects = async (req, res) => {
  try{
    pool.query('SELECT * FROM projects', (err, results) => {
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

// create a project

const createProject = async (req, res) => {
  try {
    const { project_name, project_goal } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decoded;

    const projectResult = await pool.query(
      'INSERT INTO projects (project_name, project_goal, project_admin, total_members, created_on) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [project_name, project_goal, id, 1, new Date()]
    );

    const projectId = projectResult.rows[0].id;

    await pool.query(
      'INSERT INTO project_members (project_id, user_id) VALUES ($1, $2)',
      [projectId, id]
    );

    res.status(201).json({
      status: 'success',
      data: {
        project: projectResult.rows[0],
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

// join a project

const joinProject = async (req, res) => {
  try {
    const { project_name } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decoded;

    const projectResult = await pool.query('SELECT * FROM projects WHERE project_name = $1', [project_name]);

    if (projectResult.rows.length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Project not found',
      });
      return;
    }

    const project_id = projectResult.rows[0].id;

    const isMemberQuery = await pool.query('SELECT * FROM project_members WHERE project_id = $1 AND user_id = $2', [project_id, id]);

    if (isMemberQuery.rows.length > 0) {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'You are already a member of this project',
        },
      });
      return;
    }

    await pool.query('INSERT INTO project_members (project_id, user_id) VALUES ($1, $2)', [project_id, id]);

    res.status(200).json({
      status: 'success',
      data: {
        message: 'Joined the project successfully',
      },
    });

    await pool.query('UPDATE projects SET total_members = total_members + 1 WHERE id = $1', [project_id]);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }
};

// get all members of a project

const getAllProjectMembers = async (req, res) => {
  try {
    const { project_name } = req.body;

    const projectResult = await pool.query('SELECT * FROM projects WHERE project_name = $1', [project_name]);

    if (projectResult.rows.length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Project not found',
      });
      return;
    }

    const project_id = projectResult.rows[0].id;

    const membersResult = await pool.query('SELECT * FROM project_members WHERE project_id = $1', [project_id]);

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

module.exports = { getAllProjects, createProject, joinProject, getAllProjectMembers };
