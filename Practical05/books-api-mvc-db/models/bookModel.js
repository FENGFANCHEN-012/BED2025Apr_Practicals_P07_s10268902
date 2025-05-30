const sql = require("mssql");
const dbConfig = require("../dbConfig.js");

// Get all books
async function getAllBooks() {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query = "SELECT id, title, author FROM Books";
    const result = await connection.request().query(query);
    return result.recordset;
  } 
  
  catch (error) {
    console.error("Database error:", error);
    throw error;
  }
  
  finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

// Get book by ID
async function getBookById(id) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query = "SELECT id, title, author FROM Books WHERE id = @id";
    const request = connection.request();
    request.input("id", id);
    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return null; // Book not found
    }

    return result.recordset[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

// Create new book
async function createBook(bookData) {
  let connection;
  try {
    connection = await sql.connect(dbConfig);
    const query =
      "INSERT INTO Books (title, author) VALUES (@title, @author); SELECT SCOPE_IDENTITY() AS id;";
    const request = connection.request();
    request.input("title", bookData.title);
    request.input("author", bookData.author);
    const result = await request.query(query);
    const newBookId = result.recordset[0].id;
    return await getBookById(newBookId);
  }
  
  catch (error) {
    console.error("Database error:", error);
    throw error;
  } 
  
  finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}
// Update book
  async function updateBook(bookData,idd){
    let connection
    try {
      connection = await sql.connect(dbConfig)
  const query = `UPDATE Books SET title = @title, author = @author WHERE id = @id`;

     const request = connection.request();
     
     request.input("id",sql.Int,idd)
     request.input("title",sql.VarChar,bookData.title)
     request.input("author",sql.VarChar,bookData.author)
     const result = await request.query(query)
         const updatedBook = await getBookById(idd);
     return updateBook;
  }
  catch(error){
  console.error("Error Occured", error);  }
 
  finally {
    if (connection) {

      try {
        await connection.close();
      } 
      
      catch (error) {
        console.error("Error closing connection:", error);
      }
    }
  }
}

async function deleteBook(BookId){
      try{
        connection = await sql.connect(dbConfig)
        const query =  `DELETE FROM Books WHERE id = @id`
        const request = connection.request();

        request.input("id",sql.Int,BookId)
        const result = request.query(query);
          return result.rowsAffected > 0;
      }
      catch(error){
        console.error("error Occur "+error);
      }
     finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}
module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  

};