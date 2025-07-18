const sql = require('mssql');
let dbConfig = require('dotenv').config();


async function getAllBooks() {
 
  const result = await sql.connect(dbConfig).request().query("SELECT * FROM Books");
  return result.recordset;
}

async function updateBookAvailability(bookId, availability) {
    let connection = sql.connect(dbConfig)
    const result = await connection.request()
    .input("bookId", sql.Int, bookId)
    .input("availability", sql.Char(1), availability)
    .query(
      "UPDATE Books SET availability = @availability WHERE book_id = @bookId"
    );
}

module.exports = { getAllBooks, updateBookAvailability };
