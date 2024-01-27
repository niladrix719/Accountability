const sql = require('@vercel/postgres');

// get all users

const getAllUsers = async (req, res) => {
  try {
    const result = await sql`SELECT * FROM users`;
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

// create a user

const createUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const result =
      await sql`INSERT INTO users (username, password, email, created_on) VALUES (${username}, ${password}, ${email}, ${new Date()}) RETURNING *`;
    return res.status(201).json({ result });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

module.exports = { getAllUsers, createUser };
