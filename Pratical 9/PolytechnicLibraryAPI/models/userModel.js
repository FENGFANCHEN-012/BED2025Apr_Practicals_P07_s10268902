const sql = require("mssql");

exports.findByUsername = async (username) => {
  const result = await sql.query`SELECT * FROM Users WHERE username = ${username}`;
  return result.recordset[0];
};

exports.createUser = async (username, passwordHash, role) => {
  await sql.query`
    INSERT INTO Users (username, passwordHash, role)
    VALUES (${username}, ${passwordHash}, ${role})
  `;
};
