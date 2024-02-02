const pool = require('../db');
const jwt = require('jsonwebtoken');

// get all teams

const getAllTeams = async (req, res) => {
  try{
    pool.query('SELECT * FROM teams', (err, results) => {
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

// create a Team

const createTeam = async (req, res) => {
  try {
    const { team_name, project_id } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decoded;

    const teamResult = await pool.query(
      'INSERT INTO projects (team_name, team_admin, team_progress, total_members) VALUES ($1, $2, $3, $4) RETURNING *',
      [team_name, id, 0, 0]
    );

    const teamId = projectResult.rows[0].id;

    await pool.query(
      'INSERT INTO team_members (team_id, user_id) VALUES ($1, $2)',
      [teamId, id]
    );

    await pool.query(
      'INSERT INTO team_projects (team_id, project_id) VALUES ($1, $2)',
      [teamId, project_id]
    );

    res.status(201).json({
      status: 'success',
      data: {
        team: teamResult.rows[0],
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

// join a Team

const joinTeam = async (req, res) => {
  try {
    const { team_name } = req.body;
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decoded;

    const teamResult = await pool.query('SELECT * FROM teams WHERE team_name = $1', [team_name]);

    if (teamResult.rows.length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Team not found',
      });
      return;
    }

    const team_id = teamResult.rows[0].id;

    const isMemberQuery = await pool.query('SELECT * FROM team_members WHERE team_id = $1 AND user_id = $2', [team_id, id]);

    if (isMemberQuery.rows.length > 0) {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'You are already a member of this team',
        },
      });
      return;
    }

    await pool.query('INSERT INTO team_members (team_id, user_id) VALUES ($1, $2)', [team_id, id]);

    res.status(200).json({
      status: 'success',
      data: {
        message: 'Joined the team successfully',
      },
    });

    await pool.query('UPDATE teams SET total_members = total_members + 1 WHERE id = $1', [team_id]);
  } catch (err) {
    console.error(err.message);
    res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });
  }
};

// get all members of a team

const getAllTeamMembers = async (req, res) => {
  try {
    const { team_name } = req.body;

    const teamResult = await pool.query('SELECT * FROM teams WHERE team_name = $1', [team_name]);

    if (teamResult.rows.length === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Team not found',
      });
      return;
    }

    const team_id = teamResult.rows[0].id;

    const membersResult = await pool.query('SELECT * FROM team_members WHERE team_id = $1', [team_id]);

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

module.exports = { getAllTeams, createTeam, joinTeam, getAllTeamMembers };
