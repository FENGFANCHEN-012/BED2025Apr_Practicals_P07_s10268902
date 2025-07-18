const sql = require('mssql');
let dbConfig = require('dotenv').config();




async function getUserByUsername(username) {
  let connection = sql.connect(dbConfig)
  const result = await connection.request()
    
    .input("username", sql.VarChar, username)
    .query("SELECT * FROM Users WHERE username = @username");
  return result.recordset[0];
}

async function createUser(username, passwordHash, role) {
  let connection = sql.connect(dbConfig)
  const result = await connection.request()
   
    .input("username", sql.VarChar, username)
    .input("passwordHash", sql.VarChar, passwordHash)
    .input("role", sql.VarChar, role)
    .query(
      "INSERT INTO Users (username, passwordHash, role) VALUES (@username, @passwordHash, @role)"
    );
}

module.exports = { getUserByUsername, createUser };
