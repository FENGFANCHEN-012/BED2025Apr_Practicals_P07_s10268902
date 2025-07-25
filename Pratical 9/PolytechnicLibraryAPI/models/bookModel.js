const sql = require("mssql");

exports.getAllBooks = async () => {
  const result = await sql.query("SELECT * FROM Books");
  return result.recordset;
};

exports.updateAvailability = async (id, availability) => {
  await sql.query`UPDATE Books SET availability = ${availability} WHERE book_id = ${id}`;
};
