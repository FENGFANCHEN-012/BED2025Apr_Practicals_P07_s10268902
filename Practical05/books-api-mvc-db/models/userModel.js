

const sql       = require("mssql");
const bcrypt    = require("bcryptjs");
const dbConfig  = require("../dbConfig.js");


async function closeConnection(connection) {
  if (connection) {
    try   { await connection.close(); }
    catch (err) { console.error("Error closing connection:", err); }
  }
}


/** GET  /users */
async function getAllUsers() {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query  = "SELECT id, username, email FROM Users;";
    const { recordset } = await connection.request().query(query);
    return recordset;
  } finally {
    await closeConnection(connection);
  }
}

/** GET  /users/:id */
async function getUserById(id) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const result = await connection
      .request()
      .input("id", sql.Int, id)
      .query("SELECT id, username, email FROM Users WHERE id=@id;");
    return result.recordset[0] || null;
  } finally {
    await closeConnection(connection);
  }
}

/** POST /users */
async function createUser({ username, email, password }) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);

    // 加盐哈希密码
    const salt          = await bcrypt.genSalt(10);
    const passwordHash  = await bcrypt.hash(password, salt);

    const query = `
      INSERT INTO Users (username, email, passwordHash)
      VALUES (@username, @email, @passwordHash);
      SELECT SCOPE_IDENTITY() AS id;`;

    const { recordset } = await connection.request()
      .input("username",     sql.VarChar(50), username)
      .input("email",        sql.VarChar(255), email)
      .input("passwordHash", sql.VarChar(255), passwordHash)
      .query(query);

    // 返回安全字段
    return { id: recordset[0].id, username, email };
  } finally {
    await closeConnection(connection);
  }
}

/** PUT /users/:id */
async function updateUser(id, { username, email, password }) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);

    // 动态拼接 SET 片段 + inputs
    const setParts = [];
    const request  = connection.request().input("id", sql.Int, id);

    if (username !== undefined) {
      setParts.push("username=@username");
      request.input("username", sql.VarChar(50), username);
    }
    if (email !== undefined) {
      setParts.push("email=@email");
      request.input("email", sql.VarChar(255), email);
    }
    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      setParts.push("passwordHash=@passwordHash");
      request.input("passwordHash", sql.VarChar(255), passwordHash);
    }
    if (setParts.length === 0) return null; // 没改任何字段

    const query = `UPDATE Users SET ${setParts.join(", ")} WHERE id=@id;`;
    const { rowsAffected } = await request.query(query);
    return rowsAffected[0] === 1;
  } finally {
    await closeConnection(connection);
  }
}

/** DELETE /users/:id */
async function deleteUser(id) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const { rowsAffected } = await connection
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Users WHERE id=@id;");
    return rowsAffected[0] === 1;
  } finally {
    await closeConnection(connection);
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
